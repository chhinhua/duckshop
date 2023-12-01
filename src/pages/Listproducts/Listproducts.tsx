import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

import Pagination from '@mui/material/Pagination';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContentPasteSearch from '@mui/icons-material/ContentPasteSearch';

import ICategory from '../../interface/category';
import { getAllCategoryWithPagination } from '../../apis/categoryApii';
import CardComp from '../../components/Card';
import { getAllProductSearchWithinPagination } from '../../apis/productApi';
import IProduct from '../../interface/product';
import config from '../../config';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import LinearProgress from '@mui/material/LinearProgress';

function Listproducts() {
    const location = useLocation();
    const hash = decodeURIComponent(location.hash.substring(1));
    let search = '';
    let cate = '';

    // Kiểm tra xem có dấu thăng (#) hay không
    if (hash) {
        if (hash.includes('cate')) {
            cate = hash.substring(5);
        } else {
            search = hash;
        }
        // Thay đổi URL, xóa dấu thăng và mọi dữ liệu sau nó
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    // handle load api
    const [isLoading, setLoading] = useState<boolean>(false);

    // change page
    const [data, setData] = useState<Array<IProduct>>([]); // Dữ liệu từ API
    const [page, setPage] = useState<number>(1); // Trang hiện tại
    const [totalPages, setTotalPages] = useState<number>(0); // Tổng số trang
    const [totalProducts, setTotalProducts] = useState<number>(0); // Tổng số san pham
    const [totalProductsPage, setTotalProductsPage] = useState<number>(0); // Tổng số san pham cua 1 trang
    const [filter, setFilter] = useState<string>('');
    const [cateFilter, setCateFilter] = useState<Array<string>>([cate]);
    const itemsPerPage = 40;

    const getAllProducts = async (pageNo: number, filter: string, cateFilter: Array<string>) => {
        try {
            const resultcateFilterString = cateFilter.join(',');

            setLoading(true);
            const response = await getAllProductSearchWithinPagination(
                pageNo,
                itemsPerPage,
                search,
                resultcateFilterString,
                filter,
            );
            setLoading(false);

            if (response.status === 200) {
                const { content, totalPages, totalElements, last, lastPageSize, pageSize } = response.data;
                if (last) {
                    setTotalProductsPage(lastPageSize);
                } else {
                    setTotalProductsPage(pageSize);
                }

                setData(content);
                setTotalPages(totalPages);
                setTotalProducts(totalElements);
            } else {
                toast.error(response.data.message || response.data);
            }
        } catch (error) {
            toast.error('Đang bảo trì quay lại sau');
        }
    };

    const handleGetFilter = (event: SelectChangeEvent) => {
        setFilter(event.target.value as string);
    };

    const handleSelectCategoryFilter = (categoryName: string) => {
        const updatedSelection = cateFilter.includes(categoryName)
            ? cateFilter.filter((category) => category !== categoryName)
            : [...cateFilter, categoryName];

        setCateFilter(updatedSelection);
    };

    // handle change page
    const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
        window.scrollTo(0, 0);
        setPage(newPage);
    };

    useEffect(() => {
        getAllProducts(page, filter, cateFilter);
    }, [page, search, filter, cateFilter]);

    // handle get allCate
    const [listCate, setListCate] = useState<Array<ICategory>>([]);
    const handleGetAllCate = async () => {
        // setListCate();
        try {
            const response = await getAllCategoryWithPagination();

            // Kiểm tra nếu có thuộc tính data
            if (response.data && Array.isArray(response.data.content)) {
                setListCate(response.data.content);
            } else {
                console.error("Response does not contain 'data' property.");
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };
    useEffect(() => {
        handleGetAllCate();
    }, []);

    // handle menu
    const [openMenu, setOpenMenu] = useState(false);

    const toggleMenu = () => () => {
        setOpenMenu((prev) => !prev);
    };

    // handle scroll to fix header
    const [scroll, setScroll] = useState(false);
    const listenScrollEvent = () => {
        window.scrollY > 120 ? setScroll(true) : setScroll(false);
    };

    useEffect(() => {
        window.addEventListener('scroll', listenScrollEvent);
        return () => {
            window.removeEventListener('scroll', listenScrollEvent);
        };
    }, []);

    return (
        <>
            <Dialog onClose={() => setLoading(false)} open={isLoading} fullWidth maxWidth="sm">
                <DialogTitle> Chờ giây lát !</DialogTitle>
                <DialogContent>
                    <LinearProgress color="success" />
                </DialogContent>
            </Dialog>
            <div className="w-10/12 m-auto pt-32">
                {/* start section 1 */}
                <div
                    className={`${
                        scroll ? 'fixed duration-200 ease-in top-18 left-0 w-full w-screen' : ' grid-cols-2'
                    }   z-50 grid bg-transparen `}
                >
                    <strong className={`${scroll ? 'hidden' : ''} `}>
                        Đang hiển thị {totalProductsPage} trong {totalProducts} sản phẩm
                    </strong>
                    <div className={`${scroll ? ' flex justify-end' : 'w-full flex justify-end'}`}>
                        <Button variant="contained" onClick={toggleMenu()}>
                            <div className="text-lg normal-case">Lọc sản phẩm</div>
                        </Button>
                    </div>
                </div>
                {/* end section 1 */}
                {/* start section 2 */}
                <div className="h-full">
                    {/* start navigation  */}
                    <Drawer anchor="right" open={openMenu} onClose={toggleMenu()}>
                        {/* Start Select Filter */}
                        <div>
                            <Accordion defaultExpanded>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>Lọc theo yêu cầu</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <FormControl fullWidth>
                                        <InputLabel>Yêu cầu</InputLabel>
                                        <Select
                                            value={filter}
                                            input={<OutlinedInput label="Yêu cầu" />}
                                            onChange={handleGetFilter}
                                        >
                                            <MenuItem value={''}>Không chọn</MenuItem>
                                            <MenuItem value={config.SearchFilter.favoriteAsc}>
                                                Lượt thích: Thấp đến Cao
                                            </MenuItem>
                                            <MenuItem value={config.SearchFilter.favoriteDesc}>
                                                Lượt thích: Cao đến Thấp
                                            </MenuItem>
                                            <MenuItem value={config.SearchFilter.priceAsc}>Giá: Thấp đến Cao</MenuItem>
                                            <MenuItem value={config.SearchFilter.priceDesc}>Giá: Cao đến Thấp</MenuItem>
                                            <MenuItem value={config.SearchFilter.ratingAsc}>
                                                Số sao: Thấp đến Cao
                                            </MenuItem>
                                            <MenuItem value={config.SearchFilter.ratingDesc}>
                                                Số sao: Cao đến Thấp
                                            </MenuItem>
                                            <MenuItem value={config.SearchFilter.reviewAsc}>
                                                Lượt đánh giá: Thấp đến Cao
                                            </MenuItem>
                                            <MenuItem value={config.SearchFilter.reviewDesc}>
                                                Lượt đánh giá: Cao đến Thấp
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                        {/* End Select Filter */}
                        {/* Start Select Category */}
                        <div className="w-96">
                            <Accordion defaultExpanded>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>Mục sản phẩm</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <FormGroup>
                                        {listCate.map((item, index) => (
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={cateFilter.includes(item.name)}
                                                        onChange={() => handleSelectCategoryFilter(item.name)}
                                                    />
                                                }
                                                label={item.name}
                                                key={index}
                                            />
                                        ))}
                                    </FormGroup>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                        {/* End Select Category */}
                    </Drawer>
                    {/* end navigation  */}
                    {/* start list item */}
                    <div className="col-span-5 px-3 xl:col-span-4 ">
                        {data.length !== 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
                                {data.map((item, index) => (
                                    <CardComp key={index} itemProduct={item} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center pt-20 text-xl  text-gray-400 gap-5">
                                <ContentPasteSearch sx={{ fontSize: '100px' }} />
                                Hix. Không có sản phẩm nào. Bạn thử tắt điều kiện lọc và tìm lại nhé?
                            </div>
                        )}
                    </div>
                    {/* end list item */}
                </div>
                {/* end section 2 */}
                {/* start section 3 */}
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
                {/* end section 3 */}
            </div>
        </>
    );
}

export default Listproducts;
