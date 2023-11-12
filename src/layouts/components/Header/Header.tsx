import { useState, useEffect } from 'react';
import Image from '../../../components/Image';
import logo from '../../../assets/img/BG 2.png';

import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Search from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Popper from '@mui/material/Popper';

import { Link, useNavigate } from 'react-router-dom';
import config from '../../../config';

import { useAppSelector, useAppDispatch } from '../../../redux/hook';
import { selectIsLogin, setIsLogin } from '../../../pages/LogIn/loginSlice';

function Header() {
    const isLogin = useAppSelector(selectIsLogin);
    const dispatch = useAppDispatch();

    // handle logged
    const navaigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('tokenType');
        dispatch(setIsLogin(false));
        navaigate('/');
        handlePopoverClose();
    };

    // handle scroll to fix header
    const [scroll, setScroll] = useState(false);
    const listenScrollEvent = () => {
        window.scrollY > 100 ? setScroll(true) : setScroll(false);
    };

    useEffect(() => {
        window.addEventListener('scroll', listenScrollEvent);
        return () => {
            window.removeEventListener('scroll', listenScrollEvent);
        };
    }, []);

    // handle Popover user login logout
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handlePopoverToggle = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <>
            <div
                className={`${
                    scroll ? 'bg-header shadow-xl fixed duration-200 ease-in ' : 'bg-transparent absolute '
                } h-18 flex flex-col justify-center items-center w-full z-50`}
            >
                <div className="w-11/12 grid grid-flow-col grid-cols-3 place-content-between ">
                    <div className="h-full w-48 col-span-1">
                        <Link to={config.Routes.home}>
                            <Image src={logo} className="h-full w-full" />
                        </Link>
                    </div>
                    <form className="w-full h-full col-span-1 mt-2.5">
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <Search className="mr-1 my-0.5" />
                            <TextField
                                className=" w-4/6 text-sm border-b"
                                id="standard-basic"
                                label="Tìm kiếm"
                                variant="standard"
                            />
                        </Box>
                    </form>

                    <div className="flex justify-end items-center md:gap-3 gap-0 col-span-1">
                        {isLogin ? (
                            <>
                                <IconButton onClick={handlePopoverToggle}>
                                    <Avatar alt="Đức" sx={{ width: 32, height: 32 }} />
                                </IconButton>
                                <Popper open={open} anchorEl={anchorEl} onMouseLeave={handlePopoverClose}>
                                    <div className="flex flex-col text-sm bg-white rounded">
                                        <Link
                                            to={config.Routes.profile}
                                            className="hover:bg-slate-100 hover:text-red-400 p-3"
                                        >
                                            Tài khoản của tôi
                                        </Link>
                                        <div
                                            className="hover:bg-slate-100 hover:text-red-400 p-3"
                                            onClick={handleLogout}
                                        >
                                            Đăng xuất
                                        </div>
                                    </div>
                                </Popper>
                                <Link to={config.Routes.cart}>
                                    <IconButton aria-label="cart">
                                        <Badge
                                            badgeContent={1}
                                            color="secondary"
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            overlap="circular"
                                        >
                                            <ShoppingCartIcon />
                                        </Badge>
                                    </IconButton>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to={config.Routes.register} className="cursor-pointer">
                                    Đăng Kí
                                </Link>
                                <div>|</div>
                                <Link to={config.Routes.logIn} className="cursor-pointer">
                                    Đăng Nhập
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
export default Header;
