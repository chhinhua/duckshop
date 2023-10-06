import React, { useState, useEffect } from 'react';
import Image from '../../../components/Image';
import logo from '../../../assets/img/BG 2.png';

import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Person from '@mui/icons-material/Person';
import Favorite from '@mui/icons-material/Favorite';
import Menu from '@mui/icons-material/Menu';
import Search from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const LIST_TOP = [
    {
        title: 'New Arrivals',
    },
    {
        title: 'Tops',
    },
    {
        title: 'Dresses',
    },
    {
        title: 'Jackets',
    },
    {
        title: 'Shoes',
    },
    {
        title: 'Sandals',
    },
    {
        title: 'Bags',
    },
];

function Header() {
    const [openMenu, setOpenMenu] = useState(false);

    const toggleMenu = () => () => {
        setOpenMenu((prev) => !prev);
    };

    const [openCh, setOpenCh] = React.useState(true);

    const handleClick = () => {
        setOpenCh(!openCh);
    };

    const [scroll, setScroll] = useState(false);
    const listenScrollEvent = () => {
        window.scrollY > 10 ? setScroll(true) : setScroll(false);
    };

    useEffect(() => {
        window.addEventListener('scroll', listenScrollEvent);
        return () => {
            window.removeEventListener('scroll', listenScrollEvent);
        };
    }, []);

    const list = (
        <List
            sx={{ minWidth: 300 }}
            className="w-full max-w-xs text-center"
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    <div className="text-2xl py-6">Menu</div>
                </ListSubheader>
            }
        >
            {LIST_TOP.map((item, index) => (
                <>
                    <ListItemButton key={index}>
                        <ListItemText primary={item.title} />
                    </ListItemButton>
                </>
            ))}

            <ListItemButton onClick={handleClick}>
                <ListItemText primary="Contact" />
                {openCh ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openCh} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary="Contact us" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary="About Duck" />
                    </ListItemButton>
                </List>
            </Collapse>
        </List>
    );
    return (
        <>
            <div
                className={`${
                    scroll ? 'bg-header shadow-xl' : 'bg-transparent'
                } h-20 flex flex-col justify-center items-center fixed w-full z-50 `}
            >
                <div className="w-11/12 grid grid-flow-col grid-cols-3 place-content-between ">
                    <form className="w-full h-full col-span-1 mt-1.5">
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <Search className="mr-1 my-0.5" />
                            <TextField
                                className=" w-4/6 text-sm border-b"
                                id="standard-basic"
                                label="Search for an Item..."
                                variant="standard"
                            />
                        </Box>
                    </form>
                    <div className="flex w-full justify-center">
                        <Image src={logo} className="h-full w-48 col-span-1 " />
                    </div>
                    <div className="flex justify-end items-center md:gap-3 gap-0 col-span-1">
                        <IconButton aria-label="person">
                            <Person />
                        </IconButton>
                        <IconButton aria-label="favorite">
                            <Favorite />
                        </IconButton>
                        <IconButton aria-label="cart">
                            <Badge
                                badgeContent={1}
                                color="secondary"
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                overlap="circular"
                                badgeStyle={{
                                    border: '2px solid white',
                                    padding: '0 4px',
                                    right: -3,
                                    top: 13,
                                }}
                            >
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>

                        <div>
                            <IconButton aria-label="favorite" onClick={toggleMenu()}>
                                <Menu />
                            </IconButton>
                            <Drawer anchor="right" open={openMenu} onClose={toggleMenu()}>
                                {list}
                            </Drawer>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Header;
