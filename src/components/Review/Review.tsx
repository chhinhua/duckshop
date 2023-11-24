import Rating from '@mui/material/Rating';
import Image from '../Image';

interface Iprops {
    avatar: string;
    username: string;
    rating: number;
    date: string;
    sku: string;
    content: string;
}

const Review = (props: Iprops) => {
    const { avatar, username, rating, date, sku, content } = props;
    return (
        <div className="flex relative py-7">
            <Image src={avatar} alt="Avatar" className="w-14 h-14 rounded-full mx-5 my-3" />
            <div>
                <div className="font-medium">{username}</div>
                <Rating defaultValue={rating} precision={0.1} readOnly sx={{ fontSize: '1rem' }} />
                <div className="text-gray-500 text-sm">
                    {date} | Phân loại:&nbsp;{sku}
                </div>
                <div className=" text-base leading-6">{content}</div>
            </div>
            <span className="absolute left-0 bottom-0 h-0.5 bg-gray-200 w-full"></span>
        </div>
    );
};

export default Review;
