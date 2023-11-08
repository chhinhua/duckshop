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
import { Link } from 'react-router-dom';
import { useCallback, useState } from 'react';

import config from '../../config';

interface CardProps {
    name?: string;
    price?: string;
    favoriteCount?: number;
    image: string;
    isFavourite?: boolean;
}
const Card = (propsCh: CardProps) => {
    const { name = ' Name Product', price = '100.000', favoriteCount = 4.5, image, isFavourite = false } = propsCh;
    // yeu thich
    const [favourite, setFavourite] = useState(isFavourite);
    const handleAddCart = useCallback(() => {
        // call api day vao gio hang
        // fake
    }, []);
    const handleChangeFavorite = useCallback(() => {
        // call api yeu thich

        // fake
        setFavourite((prev) => !prev);
    }, [favourite]);
    return (
        <div className="shadow-lg p-2 rounded-lg">
            <Link to={config.Routes.detailProduct}>
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
                        image={image}
                    />
                </Box>
            </Link>
            <CardContent>
                <div className="font-medium text-base mb-3 grid gap-1">
                    <div>{name}</div>
                    <div className="flex justify-between">
                        <span>{price} VNĐ</span>
                        <Rating defaultValue={favoriteCount} precision={0.5} readOnly />
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
