import React from 'react';
import classNames from 'classnames/bind';
import styles from './Card.module.scss';
import Image from '../Image';
import ButtonComp from '../Button';
import AddShoppingCart from '@mui/icons-material/AddShoppingCart';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

const cx = classNames.bind(styles);

const Card = ({ className, name = ' Name Product', price = 'Price Product', image, isFavourite = false }) => {
    return (
        <div className={cx('card', className)}>
            <Image src={image} alt="Your Image" className={cx('card__image')} />
            <div className={cx('card__content')}>
                <Image src={image} alt="Your Image" className={cx('card-content__image')} />
                <div className={cx('card__info')}>
                    <h1 className={cx('card__title')}>{name}</h1>
                    <h2 className={cx('card__describe')}>{price}</h2>
                    <div>
                        <ButtonComp custom>
                            <AddShoppingCart />
                        </ButtonComp>
                        <ButtonComp custom>{isFavourite ? <Favorite /> : <FavoriteBorder />}</ButtonComp>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
