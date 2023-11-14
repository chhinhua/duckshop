// import Image from '../Image';
// import ButtonComp from '../Button';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';

import config from '../../config';
import IProduct from '../../interface/product';
import { addToCart } from '../../apis/cartApi';

import { toast } from 'react-toastify';

const Card = (props: { itemProduct: IProduct }) => {
    const { itemProduct } = props;
    const navigate = useNavigate();

    // yeu thich
    const [favourite, setFavourite] = useState(false);
    const handleAddCart = useCallback(async () => {
        // call api day vao gio hang not style
        if (itemProduct.id) {
            const quantity: number = 1; // so luong san pham
            const productId: number = +itemProduct.id; //id san pham
            const valueNames: Array<string> | null = null; //style san pham
            try {
                const resonse = await addToCart(quantity, productId, valueNames);

                if (
                    resonse &&
                    resonse.status === 201 &&
                    resonse.data &&
                    resonse.data.product &&
                    resonse.data.product.name
                ) {
                    toast.success('Đã thêm vào giỏ hàng');
                }
            } catch {
                toast.error('Lỗi không thêm được sản phẩm');
            }
        }
    }, []);
    const handleChangeFavorite = useCallback(() => {
        // call api yeu thich

        // fake
        setFavourite((prev) => !prev);
    }, [favourite]);
    // chi tiet san pham
    const handleNextDetailPage = () => {
        navigate(`${config.Routes.detailProduct}#${itemProduct.id}`);
    };
    return (
        <div className="shadow-lg p-2 rounded-lg">
            <div onClick={handleNextDetailPage}>
                <Box
                    sx={{
                        height: 270, // Chiều cao cố định
                        overflow: 'hidden',
                        margin: 1,
                        '&:hover .image': {
                            transform: 'scale(1.2)',
                        },
                    }}
                >
                    <CardMedia
                        className="image"
                        sx={{
                            width: '100%',
                            height: '100%',
                            transition: 'transform 0.2s',
                        }}
                        image={itemProduct.listImages[0]}
                    />
                </Box>
            </div>
            <CardContent>
                <div className="font-medium text-base mb-3 grid gap-1">
                    <div>{itemProduct.name}</div>
                    <div className="flex justify-between">
                        <span>{itemProduct.price} VNĐ</span>
                        <Rating defaultValue={itemProduct.rating} precision={0.5} readOnly />
                    </div>
                </div>
            </CardContent>
            <CardActions>
                <Button fullWidth variant="outlined" onClick={handleAddCart}>
                    <ShoppingCart />
                </Button>
                <Button onClick={handleChangeFavorite}>
                    {favourite ? <Favorite sx={{ color: 'black' }} /> : <FavoriteBorder sx={{ color: 'black' }} />}
                </Button>
            </CardActions>
        </div>
    );
};

export default Card;
