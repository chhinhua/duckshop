import config from '../config/index';

import Error404 from '../pages/Error404';

import Home from '../pages/Home/Home';
import Listproducts from '../pages/Listproducts/Listproducts';
import DetailProduct from '../pages/DetailProduct/DetailProduct';
import LogIn from '../pages/LogIn/LogIn';
import Register from '../pages/Register/Register';
import CheckOut from '../pages/CheckOut/CheckOut';
import Cart from '../pages/Cart/Cart';

const publishRoute = [
    { path: config.Routes.home, component: Home },
    { path: config.Routes.listProducts, component: Listproducts },
    { path: config.Routes.detailProduct, component: DetailProduct },
    { path: config.Routes.logIn, component: LogIn },
    { path: config.Routes.register, component: Register },
    { path: config.Routes.cart, component: Cart },
    { path: config.Routes.checkOut, component: CheckOut },
    { path: config.Routes.error, component: Error404, layout: null },
];

// required sign in
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const privateRoute: any[] = [];

export { publishRoute, privateRoute };
