import { useEffect, useRef, useState } from 'react';
import Review from '../../../components/Review/Review';
import { getAllReviewWithPagination } from '../../../apis/reviewApi';
import Ireview from '../../../interface/review';
import { toast } from 'react-toastify';
import Pagination from '@mui/material/Pagination';
import ButtonRating from '../Button/ButtonRating';
import Rating from '@mui/material/Rating';

interface Iprops {
    idProduct: number;
    rating: number;
}

const ReviewProductCurrent = (props: Iprops) => {
    const { idProduct, rating } = props;
    // get data
    const [data, setData] = useState<Array<Ireview>>([]); // Dữ liệu từ API
    const [page, setPage] = useState<number>(1); // Trang hiện tại
    const [totalPages, setTotalPages] = useState<number>(0); // Tổng số trang
    const itemsPerPage = 4;

    const getAllReviewOfProduct = async (id: number, pageNo: number) => {
        try {
            if (idProduct && !isNaN(+idProduct)) {
                // tồn tai ma san pham và phải là số
                const response = await getAllReviewWithPagination(id, pageNo, itemsPerPage);
                if (response.status === 200) {
                    setData(response.data.content);
                    setTotalPages(response.data.totalPages);
                } else {
                    toast.error(response.data.message || response.data);
                }
            }
        } catch {
            toast.error('Đang bảo trì');
        }
    };
    // handle change page
    const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage);
    };
    // auto scroll
    const targetComponentRef = useRef<HTMLDivElement | null>(null);
    const scrollToComponent = () => {
        if (targetComponentRef.current) {
            targetComponentRef.current.scrollIntoView({
                behavior: 'smooth',
            });
        }
    };

    useEffect(() => {
        getAllReviewOfProduct(+idProduct, page);
        scrollToComponent();
    }, [idProduct, page]);
    return (
        <>
            <div ref={targetComponentRef} className="bg-gray-200 p-3 rounded text-xl font-normal">
                ĐÁNH GIÁ SẢN PHẨM
            </div>
            <div className="bg-orange-50 h-max p-5">
                <div className="grid grid-cols-8">
                    <div className="col-span-3 lg:col-span-2">
                        <div className="text-center mt-4">
                            <div>
                                <span className="text-red-500 text-2xl font-bold">{rating}&nbsp;</span>
                                <span className="text-red-500 text-lg">trên 5</span>
                            </div>
                            <Rating readOnly value={rating} precision={0.01} sx={{ fontSize: '1.8rem' }} />
                        </div>
                    </div>

                    <div className="col-span-5 lg:col-span-6 flex flex-wrap items-center gap-3">
                        <ButtonRating>Tất cả</ButtonRating>
                        <ButtonRating>5 sao (0)</ButtonRating>
                        <ButtonRating>4 sao (0)</ButtonRating>
                        <ButtonRating>3 sao (0)</ButtonRating>
                        <ButtonRating>2 sao (0)</ButtonRating>
                        <ButtonRating>1 sao (0)</ButtonRating>
                    </div>
                </div>
            </div>
            {data.map((item, index) => (
                <Review key={index} item={item} />
            ))}
            <div className="w-full flex justify-center my-10">
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    variant="outlined"
                    boundaryCount={1}
                />
            </div>
        </>
    );
};

export default ReviewProductCurrent;
