import { SetStateAction, useEffect, useState } from 'react';

import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import NavigateBefore from '@mui/icons-material/NavigateBefore';
import NavigateNext from '@mui/icons-material/NavigateNext';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import { useLocation } from 'react-router-dom';
import { getSingleProduct } from '../../apis/productApi';
import IProduct from '../../interface/product';
import { toast } from 'react-toastify';

const BootstrapButton = styled(Button)({
    backgroundColor: 'transparent',
    borderColor: '#B9B4C7',
    color: '#000',
    '&:hover': {
        boxShadow: 'none',
        backgroundColor: 'transparent',
    },
    '&:active': {
        boxShadow: 'none',
        borderColor: '#000',
    },
    '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,0,0,.15)',
    },
});

const DetailProduct = () => {
    // handle get id
    const location = useLocation();
    const idProduct = location.hash.substring(1);
    // handle data
    const [product, setProduct] = useState<IProduct>(); // Dữ liệu từ API

    const getProduct = async (id: string) => {
        await getSingleProduct(id)
            .then((response) => {
                setProduct(response.data);

                console.log('check data', response.data);
            })
            .catch((error) => {
                toast.error(error.response?.data.message ?? 'Mất kết nối server!');
            });
    };
    useEffect(() => {
        getProduct(idProduct);
    }, []);

    // handle image
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const [picColor, setPicColor] = useState<string>();
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
    const handleChangePicColor = (pic: string) => {
        setPicColor(pic);
    };

    //  handle size
    const [size, setSize] = useState<string>('');

    const handleChangeSize = (event: { target: { value: SetStateAction<string> } }) => {
        setSize(event.target.value);
    };

    return (
        <div className="w-11/12 m-auto pt-32">
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
                        className="w-full h-144 bg-cover bg-no-repeat bg-center relative rounded-md"
                        style={{ backgroundImage: picColor ? `url(${picColor})` : `url(${images[currentImageIndex]})` }}
                    >
                        <div className="w-full flex justify-end ">
                            <IconButton onClick={handlePreviousClick}>
                                <NavigateBefore className="bg-white rounded-full" sx={{ fontSize: 35 }} />
                            </IconButton>
                            <IconButton onClick={handleNextClick}>
                                <NavigateNext className="bg-white rounded-full text-lg" sx={{ fontSize: 35 }} />
                            </IconButton>
                        </div>
                    </div>
                </div>
                {/* End image product */}
                {/* Start info prođuct */}
                <div className="col-span-12 md:col-span-6 lg:col-span-5 md:ml-10 ">
                    <div className="text-xl not-italic font-medium">{product?.name}</div>
                    <div className="text-base not-italic font-medium">{product?.price} VNĐ</div>

                    <div className="mt-10">
                        <span>Chọn Màu</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3  md:grid-cols-2 xl:grid-cols-3 gap-2">
                        {product?.options[0].values.map((item, index) => (
                            <BootstrapButton key={index} onClick={() => handleChangePicColor(item.imageUrl)}>
                                <Card
                                    key={index}
                                    sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
                                >
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <CardContent>{item.valueName}</CardContent>
                                    </Box>
                                    <CardMedia
                                        component="img"
                                        sx={{ width: 70 }}
                                        image={item.imageUrl || null}
                                        alt={item.valueId}
                                    />
                                </Card>
                            </BootstrapButton>
                        ))}
                    </div>

                    <div className="mt-10">
                        <span>Chọn Size</span>
                    </div>
                    <FormControl sx={{ my: 1, width: '100%' }}>
                        <InputLabel id="demo-simple-select-autowidth-label">Size</InputLabel>
                        <Select value={size} onChange={handleChangeSize} label="Age">
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {product?.options[1].values.map((item, index) => (
                                <MenuItem key={index} value={item.valueId}>
                                    {item.valueName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button fullWidth variant="contained" sx={{ height: 50 }}>
                        <ShoppingCart />
                    </Button>
                    <div className="pt-10">
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Delivery & Returns</Typography>
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
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography>Product Information</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>{product?.description}</Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3a-content"
                                id="panel3a-header"
                            >
                                <Typography>Reviews (0)</Typography>
                            </AccordionSummary>
                            <AccordionDetails></AccordionDetails>
                        </Accordion>
                    </div>
                </div>
                {/* End info prođuct */}
            </div>
        </div>
    );
};

export default DetailProduct;
