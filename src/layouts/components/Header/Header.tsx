import { useState, useEffect } from 'react';
import Image from '../../../components/Image';
import logo from '../../../assets/img/BG 2.png';

import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import Avatar from '@mui/material/Avatar';
import Popper from '@mui/material/Popper';

import { Link, useNavigate } from 'react-router-dom';
import config from '../../../config';

import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { selectIsLogin, setIsLogin } from '../../../pages/LogIn/loginSlice';
import { selectToTalProductCart } from '../../../pages/Cart/totalProducCartSlice';
import Favorite from '@mui/icons-material/Favorite';
import MouseOverPopover from '../../../components/MouseOverPopover/MouseOverPopover';
import Search from '../../../components/Search/Search';

function Header() {
    const dispatch = useAppDispatch();
    const navaigate = useNavigate();
    // get userName
    let userName: string = '';
    let avatarUrl: string = '';
    const savedInfoUser = localStorage.getItem('infoUser');
    if (savedInfoUser) {
        const dataInfo = JSON.parse(savedInfoUser);
        userName = dataInfo.userName;
        avatarUrl = dataInfo.avatarUrl;
    }

    // handle logged
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('tokenType');
        localStorage.removeItem('infoUser');
        localStorage.removeItem('totalProductInCart');
        dispatch(setIsLogin(false));
        navaigate('/');
        handlePopoverClose();
    };
    // check total product in cart
    const totalProductCart = useAppSelector(selectToTalProductCart);

    // check login
    const [checkLogin, setCheckLogin] = useState<boolean>(false);
    const check = useAppSelector(selectIsLogin);
    useEffect(() => {
        check ? setCheckLogin(true) : setCheckLogin(false);
    }, [check]);

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

    // handle get allCateNotIDparant
    // const [listCate, setListCate] = useState<Array<ICategory>>([]);
    // const handleGetAllCate = async () => {
    //     // setListCate();
    //     try {
    //         const response = await getAllCategoryWithPagination('', '');

    //         // Kiểm tra nếu có thuộc tính data
    //         if (response.data && Array.isArray(response.data.content)) {
    //             const newArray = response.data.content.filter((item: ICategory) => item.parentId === null);
    //             setListCate(newArray);
    //         } else {
    //             console.error("Response does not contain 'data' property.");
    //         }
    //     } catch (error) {
    //         console.error('Error fetching categories:', error);
    //     }
    // };
    // useEffect(() => {
    //     handleGetAllCate();
    // }, []);

    // handle search
    const [search, setSearch] = useState<string>('');
    const [isDoneSearch, setDoneSearch] = useState<boolean>(false);
    useEffect(() => {
        if (isDoneSearch === true) {
            navaigate(config.Routes.listProducts + '#' + search);
        }
        return () => setDoneSearch(false);
    });
    return (
        <>
            <div
                className={`${
                    scroll ? 'bg-header shadow-xl fixed duration-200 ease-in ' : 'bg-transparent absolute '
                } h-18 flex flex-col justify-center items-center w-full z-50`}
            >
                <div className="w-10/12 grid grid-flow-col grid-cols-3 place-content-between ">
                    <div className="h-full w-24  md:w-40 col-span-1">
                        <Link to={config.Routes.home}>
                            <Image src={logo} className="h-full w-full " />
                        </Link>
                    </div>
                    <div className="w-full h-full col-span-1 flex justify-center items-center gap-5">
                        {/* {listCate.map((item, index) => (
                            <button key={index} className="font-medium text-lg md:block hidden">
                                {item.name}
                            </button>
                        ))} */}
                        <Search setSearch={setSearch} setDoneSearch={setDoneSearch} />
                    </div>
                    <div className="flex justify-end items-center md:gap-3 gap-0 col-span-1">
                        {checkLogin ? (
                            <>
                                <Link to={config.Routes.cart}>
                                    <IconButton>
                                        <MouseOverPopover content="Giỏ hàng">
                                            <Badge
                                                badgeContent={totalProductCart}
                                                color="secondary"
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                overlap="circular"
                                            >
                                                <ShoppingCartIcon />
                                            </Badge>
                                        </MouseOverPopover>
                                    </IconButton>
                                </Link>
                                <Link to={config.Routes.profile + '#' + config.PageInProfile.favouriteProfile}>
                                    <IconButton>
                                        <MouseOverPopover content="Danh sách yêu thích">
                                            <Favorite />
                                        </MouseOverPopover>
                                    </IconButton>
                                </Link>

                                <Button onClick={handlePopoverToggle}>
                                    <Avatar src={avatarUrl} alt="Avatar" sx={{ width: 32, height: 32 }} />
                                    <span className="text-base ml-1 font-medium normal-case text-black">
                                        {userName}
                                    </span>
                                </Button>
                                <Popper
                                    open={open}
                                    anchorEl={anchorEl}
                                    onMouseLeave={handlePopoverClose}
                                    sx={{ zIndex: 60 }}
                                >
                                    <div className="flex flex-col text-sm bg-white rounded">
                                        <Link
                                            to={config.Routes.profile + '#' + config.PageInProfile.homeProfile}
                                            className="hover:bg-slate-100 hover:text-red-400 p-3"
                                        >
                                            Tài khoản của tôi
                                        </Link>
                                        <Link
                                            to={
                                                config.Routes.profile + '#' + config.PageInProfile.historyPaymentProfile
                                            }
                                            className="hover:bg-slate-100 hover:text-red-400 p-3"
                                        >
                                            Đơn mua
                                        </Link>
                                        <div
                                            className="hover:bg-slate-100 hover:text-red-400 p-3"
                                            onClick={handleLogout}
                                        >
                                            Đăng xuất
                                        </div>
                                    </div>
                                </Popper>
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
