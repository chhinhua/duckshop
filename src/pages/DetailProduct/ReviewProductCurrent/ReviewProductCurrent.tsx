import { useEffect, useState } from 'react';
import Review from '../../../components/Review/Review';
import { getAllReviewWithPagination } from '../../../apis/reviewApi';
import Ireview from '../../../interface/review';
import { toast } from 'react-toastify';
import Pagination from '@mui/material/Pagination';

interface Iprops {
    idProduct: number;
}

const ReviewProductCurrent = (props: Iprops) => {
    const { idProduct } = props;
    // get data
    const [data, setData] = useState<Array<Ireview>>([]); // Dữ liệu từ API
    const [page, setPage] = useState<number>(1); // Trang hiện tại
    const [totalPages, setTotalPages] = useState<number>(0); // Tổng số trang
    const itemsPerPage = 15;

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
        window.scrollTo(0, 0);
        setPage(newPage);
    };

    useEffect(() => {
        getAllReviewOfProduct(+idProduct, page);
    }, [idProduct, page]);
    return (
        <>
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
