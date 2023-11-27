import Rating from '@mui/material/Rating';
import Image from '../Image';
import Ireview from '../../interface/review';
interface Iprops {
    item: Ireview;
}

const Review = (props: Iprops) => {
    const { content, stars, createdDate, user } = props.item;
    return (
        <div className="flex relative py-7">
            <Image src={user.avatarUrl} alt="Avatar" className="w-14 h-14 rounded-full mx-5 my-3" />
            <div>
                <div className="font-medium">{user.username}</div>
                <Rating defaultValue={stars} precision={0.1} readOnly sx={{ fontSize: '1rem' }} />
                <div className="text-gray-500 text-sm">
                    {createdDate} {/*| Phân loại:&nbsp;*/}
                </div>
                <div className=" text-base leading-6">{content}</div>
            </div>
            <span className="absolute left-0 bottom-0 h-0.5 bg-gray-200 w-full"></span>
        </div>
    );
};

export default Review;
