import React, { useEffect, useState } from 'react';

import CardComp from '../../components/Card';

import Pagination from '@mui/material/Pagination';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';

import { getAllProductWithinPagination } from '../../apis/productApi';
import { toast } from 'react-toastify';
import IProduct from '../../interface/product';

const LIST_ACTION = [
    'Shoes',
    'Sports Bras',
    'Tops & T-Shirts',
    'Hoodies & Sweatshirts',
    'Jackets',
    'Trousers & Tights',
    'Shorts',
];

function Listproducts() {
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
    // change page
    const [data, setData] = useState<Array<IProduct>>([]); // Dữ liệu từ API
    const [page, setPage] = useState(1); // Trang hiện tại
    const [totalPages, setTotalPages] = useState(11); // Tổng số trang
    const [totalProducts, setTotalProducts] = useState(10); // Tổng số trang
    const itemsPerPage = 8;

    const getAllProducts = async (pageNo: number) => {
        await getAllProductWithinPagination(pageNo, itemsPerPage)
            .then((response) => {
                // setData(response.data.content);
                // setTotalPages(response.data.totalPages);
                // setTotalProducts(response.data.totalElements);
                console.log('check data', response);
            })
            .catch((error) => {
                toast.error(error.response?.data.message ?? 'Mất kết nối server!');
            });
    };

    useEffect(() => {
        getAllProducts(page);
    }, [page]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
        console.log(event);

        setPage(newPage);
    };
    // handle menu
    const [openMenu, setOpenMenu] = useState(false);

    const toggleMenu = () => () => {
        setOpenMenu((prev) => !prev);
    };

    return (
        <>
            <div className="w-11/12 m-auto pt-32">
                {/* start section 1 */}
                <div
                    className={`${
                        scroll
                            ? 'bg-header shadow-md fixed duration-200 ease-in top-18 left-0 w-full '
                            : 'bg-transparent grid-cols-2'
                    }   pb-2 z-50 grid`}
                >
                    <strong className={`${scroll ? 'hidden' : ''} `}>
                        Đang hiển thị {itemsPerPage} trong {totalProducts} sản phẩm
                    </strong>
                    <div className={`${scroll ? 'm-auto w-11/12 flex justify-end' : 'w-full flex justify-end'}`}>
                        <Button variant="outlined" onClick={toggleMenu()}>
                            <div className="text-lg normal-case">Filter </div>
                        </Button>
                    </div>
                </div>
                {/* end section 1 */}
                {/* start section 2 */}
                <div className="h-full">
                    {/* start navigation  */}
                    <div>
                        <Drawer anchor="right" open={openMenu} onClose={toggleMenu()}>
                            {/* Start Select Popular */}
                            <div>
                                <Accordion /*defaultExpanded */>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>Popular</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <FormGroup>
                                            {LIST_ACTION.map((item, index) => (
                                                <FormControlLabel control={<Checkbox />} label={item} key={index} />
                                            ))}
                                        </FormGroup>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                            {/* End Select Popular */}
                            {/* Start Select Gender */}
                            <div>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>Gender</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <FormGroup>
                                            <FormControlLabel control={<Checkbox defaultChecked />} label="All" />
                                            <FormControlLabel control={<Checkbox />} label="Men" />
                                            <FormControlLabel control={<Checkbox />} label="Women" />
                                        </FormGroup>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                            {/* End Select Gender */}
                            {/* Start Select Category */}
                            <div>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>Category</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <FormGroup>
                                            <FormControlLabel control={<Checkbox />} label="Shoes" />
                                            <FormControlLabel control={<Checkbox />} label="Sandal" />
                                            <FormControlLabel control={<Checkbox />} label="T-Shirts" />
                                            <FormControlLabel control={<Checkbox />} label="Trousers" />
                                            <FormControlLabel control={<Checkbox />} label="Dress" />
                                            <FormControlLabel control={<Checkbox />} label="Accessory" />
                                            <FormControlLabel control={<Checkbox />} label="Backpack" />
                                        </FormGroup>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                            {/* End Select Category */}
                            {/* Start Select Filter */}
                            <div>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>Filter</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <FormGroup>
                                            <FormControlLabel control={<Checkbox />} label="Price high to low" />
                                            <FormControlLabel control={<Checkbox />} label="Price low to high" />
                                            <FormControlLabel control={<Checkbox />} label="Latest" />
                                            <FormControlLabel control={<Checkbox />} label="Many reviews" />
                                            <FormControlLabel control={<Checkbox />} label="High stars" />
                                        </FormGroup>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                            {/* End Select Filter */}
                        </Drawer>
                    </div>
                    {/* end navigation  */}
                    {/* start list item */}
                    <div className="col-span-5 px-3 xl:col-span-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
                            {data.map((item, index) => (
                                <CardComp key={index} itemProduct={item} />
                            ))}
                        </div>
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
