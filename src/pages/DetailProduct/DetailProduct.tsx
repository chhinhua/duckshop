import { SetStateAction, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Card from '@mui/material/Card';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NavigateBefore from '@mui/icons-material/NavigateBefore';
import NavigateNext from '@mui/icons-material/NavigateNext';
import ShoppingCart from '@mui/icons-material/ShoppingCart';

import { getSKUPrice, getSingleProduct } from '../../apis/productApi';
import IProduct from '../../interface/product';

import BootstrapButton from './BootstrapButton';
import config from '../../config';
import { addToCart, getCountOfItems } from '../../apis/cartApi';
import OutlinedInput from '@mui/material/OutlinedInput';
import Image from '../../components/Image';
import { useDispatch } from 'react-redux';
import { setToTalProductCart } from '../Cart/totalProducCartSlice';
import Rating from '@mui/material/Rating';
import ButtonRating from './ButtonRating';
import Review from '../../components/Review/Review';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { putFollowProduct } from '../../apis/followProductApi';

const DetailProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // handle get id
    const location = useLocation();
    const idProduct = location.hash.substring(1);
    // handle data
    const [favourite, setFavourite] = useState<boolean>(false);
    const [product, setProduct] = useState<IProduct>(); // Dữ liệu từ API

    const getProduct = async (id: number) => {
        try {
            if (idProduct && !isNaN(+idProduct)) {
                // tồn tai ma san pham và phải là số
                const response = await getSingleProduct(id);
                console.log(response);

                if (response && response.data) {
                    setProduct(response.data);
                    setFavourite(response.data.liked);
                }
                if (response.status !== 200) {
                    toast.error(response.data.message);
                    navigate(config.Routes.listProducts);
                }
            } else {
                navigate(config.Routes.listProducts);
            }
        } catch {
            toast.error('Đang bảo trì');
        }
    };
    useEffect(() => {
        getProduct(+idProduct);
    }, [idProduct]);

    //  handle size, color
    const [color, setColor] = useState<string>('');
    const [size, setSize] = useState<string>('');

    const handleChangeSize = (event: { target: { value: SetStateAction<string> } }) => {
        setSize(event.target.value);
    };

    // handle handleAddCart
    const handleAddCart = async () => {
        // call api day vao gio hang  style
        if (idProduct) {
            const quantity: number = 1; // so luong san pham
            const productId: number = +idProduct; //id san pham
            const valueNames: Array<string> = [color, size]; //style san pham
            try {
                const resonse = await addToCart(quantity, productId, valueNames);
                // handle số lượng sản phẩm trong giỏ hàng
                getTotalItemOfCart();

                // handle defaut value
                setSize('');
                setColor('');

                if (resonse?.status === 201 && resonse?.data?.product?.name) {
                    toast.success('Đã thêm vào giỏ hàng');
                } else {
                    toast.info(resonse.data.message);
                }
            } catch {
                toast.error('Lỗi không thêm được sản phẩm');
            }
        }
    };
    // handle price theo size và color
    const handleGetPrice = async () => {
        if (color && size) {
            try {
                const response = await getSKUPrice(+idProduct, color, size);
                if (response.status === 200) {
                    const updatedObject: IProduct = product;
                    updatedObject.price = response.data;
                    setProduct(updatedObject);
                } else {
                    toast.error(response.data.message || response.data);
                }
            } catch (error) {
                toast.error(`${error}`);
            }
        }
    };

    const handleToggleFavorite = async () => {
        setFavourite((prev) => !prev);
        try {
            await putFollowProduct(+idProduct);
        } catch (error) {
            toast.error(`${error}`);
        }
    };
    useEffect(() => {
        handleGetPrice();
    }, [idProduct, color, size]);

    // handle số lượng sản phẩm trong giỏ hàng
    const getTotalItemOfCart = async () => {
        const totalProductInCart = await getCountOfItems();
        if (totalProductInCart.status === 200) {
            dispatch(setToTalProductCart(+totalProductInCart.data));
        }
    };

    // handle image
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const [picColor, setPicColor] = useState<string>('');
    const images = product?.listImages || [];

    const handleNextClick = () => {
        setPicColor('');
        // Xử lý sự kiện khi người dùng bấm nút "Next"
        const newIndex = (currentImageIndex + 1) % images.length;
        setCurrentImageIndex(newIndex);
    };
    const handlePreviousClick = () => {
        setPicColor('');
        if (currentImageIndex === 0) {
            setCurrentImageIndex(images.length - 1); // Đặt lại thành chỉ số của ảnh cuối cùng
        } else {
            // Xử lý sự kiện khi người dùng bấm nút "Previous"
            setCurrentImageIndex(currentImageIndex - 1);
        }
    };
    const handleChangePic = (index: number) => {
        setPicColor('');
        setCurrentImageIndex(index);
    };
    // handle change color imgColor
    const handleChangePicColor = (pic: { valueName: string; imageUrl: string }) => {
        setPicColor(pic.imageUrl);
        setColor(pic.valueName);
    };

    return (
        <div className="w-10/12 m-auto pt-32">
            <div className="grid grid-flow-row md:grid-flow-col grid-cols-12 gap-2">
                {/* Start list image product */}
                <div className=" hidden col-span-1 lg:flex flex-col gap-2 overflow-y-auto scroll-smooth hide-scrollbar h-144">
                    {images.map((item, index) => (
                        <img
                            src={item}
                            key={index}
                            alt={item}
                            className="w-full h-20 bg-contain rounded-md hover:opacity-40"
                            onMouseEnter={() => handleChangePic(index)}
                        />
                    ))}
                </div>
                {/* End list image product */}
                {/* Start image product */}
                <div className="col-span-12 md:col-span-6 relative flex gap-1">
                    <div
                        className="w-full h-144 bg-cover bg-no-repeat bg-center relative rounded-md border-2"
                        style={{ backgroundImage: picColor ? `url(${picColor})` : `url(${images[currentImageIndex]})` }}
                    >
                        <div className="w-full flex justify-end ">
                            <IconButton onClick={handlePreviousClick}>
                                <NavigateBefore className="bg-white rounded-full" sx={{ fontSize: 35 }} />
                            </IconButton>
                            <IconButton onClick={handleNextClick}>
                                <NavigateNext className="bg-white rounded-full" sx={{ fontSize: 35 }} />
                            </IconButton>
                        </div>
                    </div>
                </div>
                {/* End image product */}
                {/* Start info prođuct */}
                <div className="col-span-12 md:col-span-6 lg:col-span-5 md:ml-10 ">
                    <div className="text-xl not-italic font-medium">{product?.name}</div>
                    <div className="text-lg not-italic font-medium pt-5 text-red-500 flex">
                        <span className="text-sm pr-1">đ</span>
                        <span>{product?.price.toLocaleString('vi-VN')}</span>
                    </div>

                    {/* start sỉze */}
                    <div className="mt-10 mb-2">
                        <span>Chọn Size</span>
                    </div>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-helper-label">Kích cỡ</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            input={<OutlinedInput label="Kích cỡ" />}
                            fullWidth
                            value={size}
                            onChange={handleChangeSize}
                        >
                            {product?.options[1].values.map((item, index) => (
                                <MenuItem key={index} value={item.valueName}>
                                    {item.valueName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {/* end sỉze */}
                    {/* start list color */}
                    <div className="mt-10">
                        <span>Chọn Màu</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3  md:grid-cols-1 lg:grid-cols-2  gap-2">
                        {product?.options[0].values.map((item, index) => (
                            <BootstrapButton key={index} onClick={() => handleChangePicColor(item)}>
                                <Card
                                    key={index}
                                    sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
                                >
                                    {/* <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <CardContent sx={{ fontSize: '12px' }}>{item.valueName}</CardContent>
                                    </Box> */}
                                    <div className="flex justify-center items-center font-semibold text-center w-full text-sm h-18">
                                        {item.valueName}
                                    </div>
                                    <Image className="h-18" src={item.imageUrl} alt={item.valueName} />
                                </Card>
                            </BootstrapButton>
                        ))}
                    </div>
                    {/* end list color */}
                    <div className="flex gap-2">
                        <Button
                            fullWidth
                            disabled={color && size ? false : true}
                            variant="contained"
                            sx={{ height: 50, marginTop: 2 }}
                            onClick={handleAddCart}
                        >
                            + <ShoppingCart />
                        </Button>

                        <Button
                            sx={{ height: 50, marginTop: 2, color: 'red', border: '1px solid red' }}
                            variant="outlined"
                            onClick={handleToggleFavorite}
                        >
                            {favourite ? <Favorite sx={{ color: 'red' }} /> : <FavoriteBorder sx={{ color: 'red' }} />}
                        </Button>
                    </div>
                    <div className="pt-10">
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Giao hàng và vận chuyển</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Đơn hàng từ 5.000.000₫ trở lên của bạn sẽ được giao hàng tiêu chuẩn miễn phí.
                                    <br /> <br />
                                    Giao hàng tiêu chuẩn 4-5 ngày làm việc Chuyển phát nhanh 2-4 ngày làm việc Đơn hàng
                                    được xử lý và giao từ Thứ Hai đến Thứ Sáu (trừ ngày lễ)
                                    <br />
                                    <br />
                                    Thành viên Duck được hưởng lợi nhuận miễn phí.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </div>
                {/* End info prođuct */}
            </div>
            {/* Start product description */}
            <div className="mt-5">
                <div className="bg-slate-100 p-3 rounded text-xl font-normal">MÔ TẢ SẢN PHẨM</div>
                <div className="mt-5 text-lg">{product?.description}</div>
            </div>

            {/* Start product reviews */}
            <div className="mt-5">
                <div className="bg-slate-100 p-3 rounded text-xl font-normal">ĐÁNH GIÁ SẢN PHẨM</div>
                <div className="bg-orange-50 h-max p-5">
                    <div className="grid grid-cols-8">
                        <div className="col-span-3 lg:col-span-2">
                            <div className="text-center mt-4">
                                <span className="text-red-500 text-2xl font-bold">{product?.rating}&nbsp;</span>
                                <span className="text-red-500 text-lg">trên 5</span>
                                <div>
                                    <Rating
                                        defaultValue={product?.rating}
                                        precision={0.5}
                                        readOnly
                                        sx={{ fontSize: '1.8rem' }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-5 lg:col-span-6 flex flex-wrap items-center gap-3">
                            <ButtonRating>Tất cả</ButtonRating>
                            <ButtonRating>5 sao (55)</ButtonRating>
                            <ButtonRating>4 sao (100)</ButtonRating>
                            <ButtonRating>3 sao (22)</ButtonRating>
                            <ButtonRating>2 sao (2)</ButtonRating>
                            <ButtonRating>1 sao (0)</ButtonRating>
                        </div>
                    </div>
                </div>
                <Review />
                <Review />
                <Review />
            </div>
        </div>
    );
};

export default DetailProduct;
