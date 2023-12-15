import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import Pagination from '@mui/material/Pagination';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';

import Review from '../../../components/Review/Review';
import { getAllReviewWithPagination } from '../../../apis/reviewApi';
import Ireview, { IStarNumberOfProduct } from '../../../interface/review';

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
    const [numberListStar, setNumberListStar] = useState<IStarNumberOfProduct>(); // ds số lượng sao
    const [star, setStar] = useState<number | null | undefined>(null); // số sao hiện tại
    const itemsPerPage = 4;

    const getAllReviewOfProduct = async (id: number, pageNo: number, star: number | null | undefined) => {
        try {
            if (idProduct && !isNaN(+idProduct)) {
                // tồn tai ma san pham và phải là số
                const response = await getAllReviewWithPagination(id, pageNo, itemsPerPage, star);

                if (response.status === 200) {
                    setData(response.data.content);
                    setTotalPages(response.data.totalPages);
                    setNumberListStar(response.data.starNumber);
                } else {
                    toast.error(response.data.message || response.data);
                }
            }
        } catch {
            toast.error('Đang bảo trì');
        }
    };
    // handle change star
    const handleChangeStar = (value: number | null | undefined) => {
        setStar(value);
        setPage(1);
    };

    // handle change page
    const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
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
        getAllReviewOfProduct(+idProduct, page, star);
        scrollToComponent();
    }, [idProduct, page, star]);

    return (
        <div className="rounded border-2">
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
                        <Button variant="outlined" onClick={() => handleChangeStar(null)}>
                            Tất cả ({numberListStar?.all})
                        </Button>
                        <Button variant="outlined" onClick={() => handleChangeStar(5)}>
                            5 sao ({numberListStar?.fiveStar})
                        </Button>
                        <Button variant="outlined" onClick={() => handleChangeStar(4)}>
                            4 sao ({numberListStar?.fourStar})
                        </Button>
                        <Button variant="outlined" onClick={() => handleChangeStar(3)}>
                            3 sao ({numberListStar?.threeStar})
                        </Button>
                        <Button variant="outlined" onClick={() => handleChangeStar(2)}>
                            2 sao ({numberListStar?.twoStar})
                        </Button>
                        <Button variant="outlined" onClick={() => handleChangeStar(1)}>
                            1 sao ({numberListStar?.oneStar})
                        </Button>
                    </div>
                </div>
            </div>
            {data.map((item, index) => (
                <Review key={index} item={item} />
            ))}
            <div className="w-full flex justify-end my-5">
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    variant="outlined"
                    boundaryCount={1}
                />
            </div>
        </div>
    );
};

export default ReviewProductCurrent;
