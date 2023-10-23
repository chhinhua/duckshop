import React, { useEffect, useState } from 'react';

import S2Baner1 from '../../assets/img/LandingPage/section-2-1.png';
import S2Baner2 from '../../assets/img/LandingPage/section-2-2.png';
import S2Baner3 from '../../assets/img/LandingPage/section-2-3.png';
import S2Baner4 from '../../assets/img/LandingPage/section-2-4.png';
import S4Baner1 from '../../assets/img/LandingPage/section-4-1.png';
import S4Baner2 from '../../assets/img/LandingPage/section-4-2.png';
import S4Baner3 from '../../assets/img/LandingPage/section-4-3.png';

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

const LIST_ACTION = [
    'Shoes',
    'Sports Bras',
    'Tops & T-Shirts',
    'Hoodies & Sweatshirts',
    'Jackets',
    'Trousers & Tights',
    'Shorts',
    'Tracksuits',
    'Jumpsuits & Rompers',
    'Skirts & Dresses',
    'Socks',
    'Accessories & Equipment',
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
    // const [data, setData] = useState([]); // Dữ liệu từ API
    const [page, setPage] = useState(1); // Trang hiện tại
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [totalPages, setTotalPages] = useState(11); // Tổng số trang

    useEffect(() => {
        // Gọi API để lấy dữ liệu
    }, [page]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
        console.log(event);
        
        setPage(newPage);
    };
    return (
        <>
            <div className="w-11/12 m-auto pt-32">
                {/* start section 1 */}
                <div className="text-center w-full">
                    <strong>Showing 1 - 12 out of 2,356 Products</strong>
                </div>
                {/* end section 1 */}
                {/* start section 2 */}
                <div className="h-full">
                    {/* start navigation  */}
                    <nav
                        className={`${
                            scroll
                                ? 'bg-header shadow-xl fixed duration-200 ease-in top-20 left-0 w-full '
                                : 'bg-transparent'
                        }  shadow-xl p-4 mb-3 z-50`}
                    >
                        <div className={`${scroll ? 'm-auto w-11/12' : 'w-full'}  flex flex-row flex-wrap  gap-2`}>
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
                        </div>
                    </nav>
                    {/* end navigation  */}
                    {/* start list item */}
                    <div className="col-span-5 px-3 xl:col-span-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
                            {[S2Baner1, S2Baner2, S2Baner3, S2Baner4, S4Baner1, S4Baner2, S4Baner3].map(
                                (item, index) => (
                                    <CardComp key={index} image={item} className="rounded" isFavourite={true} />
                                ),
                            )}
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
