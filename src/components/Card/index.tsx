import ShoppingCart from '@mui/icons-material/ShoppingCart';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import config from '../../config';
import IProduct from '../../interface/product';
import { getWishListNumber, putFollowProduct } from '../../apis/followProductApi';
import { setToTalWishList } from '../../pages/Profile/Wishlist/wishListSlice';

const Card = (props: { itemProduct: IProduct }) => {
    const { itemProduct } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // yeu thich
    const [favourite, setFavourite] = useState(itemProduct.liked ? true : false);
    const handleChangeFavorite = useCallback(async () => {
        try {
            await putFollowProduct(+itemProduct.id);
            const response = await getWishListNumber();
            dispatch(setToTalWishList(+response.data));
        } catch (error) {
            toast.error(`${error}`);
        }

        // fake
        setFavourite((prev) => !prev);
    }, [favourite]);
    // chi tiet san pham
    const handleNextDetailPage = () => {
        if (itemProduct.id) {
            navigate(`${config.Routes.detailProduct}#${itemProduct.id}`);
        } else {
            toast.error('Đang bảo trì');
        }
    };
    return (
        <div className="shadow-lg p-2 rounded-lg">
            <div onClick={handleNextDetailPage} className="cursor-pointer">
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
                <div className="font-medium text-base  grid gap-1">
                    <div className="h-18 overflow-hidden ">{itemProduct.name}</div>
                    <div className="flex justify-between mt-3">
                        <div className="text-base not-italic font-medium text-red-500 flex ">
                            <span className="text-sm pr-0.5">đ</span>
                            {itemProduct.price.toLocaleString('vi-VN')}
                        </div>
                        <Rating defaultValue={itemProduct.rating} precision={0.5} readOnly />
                    </div>
                </div>
            </CardContent>
            <CardActions>
                <Button fullWidth variant="outlined" onClick={handleNextDetailPage}>
                    <ShoppingCart />
                </Button>
                <Button onClick={handleChangeFavorite}>
                    {favourite ? <Favorite sx={{ color: 'red' }} /> : <FavoriteBorder sx={{ color: 'red' }} />}
                </Button>
                <div className="flex place-content-center w-full">
                    <span className="text-sm text-gray-600 font-medium">Yêu thích {itemProduct.favoriteCount}</span>
                </div>
            </CardActions>
        </div>
    );
};

export default Card;
