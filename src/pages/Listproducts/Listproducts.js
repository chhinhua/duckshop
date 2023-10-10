import React from 'react';

import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

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

function valuetext(value) {
    return `${value}°C`;
}

function Listproducts() {
    const [value, setValue] = React.useState([20, 37]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <div className="w-11/12 m-auto pt-32">
                {/* start section 1 */}
                <div className="flex justify-between">
                    <div className="">Showing 1 - 20 out of 2,356 Products</div>
                    <div className="">
                        <span> New Arrivals</span>
                        <IconButton>
                            <sapn className="text-base">Sort by</sapn>
                            <KeyboardArrowDown />
                        </IconButton>
                    </div>
                </div>
                {/* end section 1 */}
                {/* start section 2 */}
                <div className="flex justify-between">
                    {/* start navigation  */}
                    <nav className="bg-gray-100 w-3/12">
                        {LIST_ACTION.map((item, index) => (
                            <div key={index}>{item}</div>
                        ))}
                        <div>
                            <h3>Prices</h3>
                            <Box sx={{ width: 300 }}>
                                <Slider
                                    value={value}
                                    onChange={handleChange}
                                    valueLabelDisplay="auto"
                                    getAriaValueText={valuetext}
                                />
                            </Box>
                        </div>
                    </nav>
                    {/* end navigation  */}
                </div>
                {/* end section 2 */}
            </div>
        </>
    );
}

export default Listproducts;
