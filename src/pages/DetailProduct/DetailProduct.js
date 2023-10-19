import React, { useState } from 'react';

import S2Baner1 from '../../assets/img/LandingPage/section-2-1.png';
import S2Baner2 from '../../assets/img/LandingPage/section-2-2.png';
import S2Baner3 from '../../assets/img/LandingPage/section-2-3.png';
import S2Baner4 from '../../assets/img/LandingPage/section-2-4.png';
import ButtonComp from '../../components/Button';

import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import NavigateBefore from '@mui/icons-material/NavigateBefore';
import NavigateNext from '@mui/icons-material/NavigateNext';
import AddShoppingCart from '@mui/icons-material/AddShoppingCart';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

const BootstrapButton = styled(Button)({
    backgroundColor: 'transparent',
    borderColor: '#B9B4C7',
    color: '#000',
    '&:hover': {
        boxShadow: 'none',
        backgroundColor: 'transparent',
    },
    '&:active': {
        boxShadow: 'none',
        borderColor: '#000',
    },
    '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,0,0,.15)',
    },
});

const DetailProduct = () => {
    const isFavourite = false;

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [S2Baner1, S2Baner4, S2Baner1, S2Baner4, S2Baner1, S2Baner4, S2Baner1, S2Baner4, S2Baner1, S2Baner4];

    const handleNextClick = () => {
        // Xử lý sự kiện khi người dùng bấm nút "Next"
        const newIndex = (currentImageIndex + 1) % images.length;
        setCurrentImageIndex(newIndex);
    };
    const handlePreviousClick = () => {
        if (currentImageIndex === 0) {
            setCurrentImageIndex(images.length - 1); // Đặt lại thành chỉ số của ảnh cuối cùng
        } else {
            // Xử lý sự kiện khi người dùng bấm nút "Previous"
            setCurrentImageIndex(currentImageIndex - 1);
        }
    };
    const handleChangePic = (index) => {
        setCurrentImageIndex(index);
    };

    //  handle size
    const [size, setSize] = useState('');

    const handleChangeSize = (event) => {
        setSize(event.target.value);
    };

    return (
        <div className="w-11/12 m-auto pt-32">
            <div className="grid grid-flow-row md:grid-flow-col grid-cols-12 gap-2">
                {/* Start list image product */}
                <div className=" hidden col-span-1 lg:flex flex-col gap-2 overflow-y-auto scroll-smooth hide-scrollbar h-144">
                    {images.map((item, index) => (
                        <img
                            src={item}
                            key={index}
                            alt={item}
                            className="w-full h-20 bg-contain rounded-md hover:opacity-40"
                            onMouseEnter={() => handleChangePic(index)}
                        />
                    ))}
                </div>
                {/* End list image product */}
                {/* Start image product */}
                <div className="col-span-12 md:col-span-6 relative flex gap-1">
                    {/* <img
                        src={images[currentImageIndex]}
                        alt={images[currentImageIndex]}
                        className="w-full h-144 rounded-lg"
                    /> */}
                    <div
                        className="w-full h-144 bg-cover bg-no-repeat bg-center relative rounded-md"
                        style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
                    >
                        <div className="w-full flex justify-end ">
                            <IconButton>
                                <NavigateBefore
                                    className="bg-white rounded-full"
                                    onClick={handlePreviousClick}
                                    sx={{ fontSize: 35 }}
                                />
                            </IconButton>
                            <IconButton>
                                <NavigateNext
                                    className="bg-white rounded-full text-lg"
                                    onClick={handleNextClick}
                                    sx={{ fontSize: 35 }}
                                />
                            </IconButton>
                        </div>
                    </div>
                </div>
                {/* End image product */}
                {/* Start info prođuct */}
                <div className="col-span-12 md:col-span-6 lg:col-span-5 md:ml-10 ">
                    <div className="text-2xl not-italic font-medium">Nike Air Max 97 SE</div>
                    <div className="text-base not-italic font-medium">Men's Shoes</div>
                    <div className="text-base not-italic font-medium">100 $</div>

                    <div className="mt-10">
                        <span>Select Color</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3  md:grid-cols-2 xl:grid-cols-3 gap-2">
                        {['Green', 'Red', 'Black', 'White', 'Blue', 'Purple'].map((item, index) => (
                            <BootstrapButton>
                                <Card
                                    key={index}
                                    sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
                                >
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <CardContent>{item}</CardContent>
                                    </Box>
                                    <CardMedia component="img" sx={{ width: 70 }} image={S2Baner1} alt={S2Baner1} />
                                </Card>
                            </BootstrapButton>
                        ))}
                    </div>

                    <div className="mt-10">
                        <span>Select Size</span>
                    </div>
                    <div className="w-full grid grid-cols-3 gap-2">
                        <FormControl sx={{ my: 1, width: '100%' }} className="col-span-2">
                            <InputLabel id="demo-simple-select-autowidth-label">Size</InputLabel>
                            <Select value={size} onChange={handleChangeSize} label="Age">
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {['XS', 'S', 'M', 'L', 'XL', '2XL'].map((item, index) => (
                                    <MenuItem key={index} value={item}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <div className="col-span-1 flex justify-end w-full">
                            <ButtonComp custom>
                                <AddShoppingCart />
                            </ButtonComp>
                        </div>
                    </div>
                    <div className="pt-10">
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Delivery & Returns</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
                                    ex, sit amet blandit leo lobortis eget.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography>Product Information</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Layer on style with the Air Max 97. The cracked leather and soft suede update the
                                    iconic design while the original look (inspired by Japanese bullet trains and water
                                    droplets) still takes centre stage. Easy-to-style colours let you hit the streets
                                    quickly.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3a-content"
                                id="panel3a-header"
                            >
                                <Typography>Reviews (0)</Typography>
                            </AccordionSummary>
                            <AccordionDetails></AccordionDetails>
                        </Accordion>
                    </div>
                </div>
                {/* End info prođuct */}
            </div>
        </div>
    );
};

export default DetailProduct;
