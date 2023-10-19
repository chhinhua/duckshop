import config from '../config/index';

import Error404 from '../pages/Error404';

import Home from '../pages/Home/Home';
import Listproducts from '../pages/Listproducts/Listproducts';
import DetailProduct from '../pages/DetailProduct/DetailProduct';

const publishRoute = [
    { path: config.Routes.home, component: Home },
    { path: config.Routes.listProducts, component: Listproducts },
    { path: config.Routes.detailProduct, component: DetailProduct },
    { path: config.Routes.error, component: Error404, layout: null },
];

// required sign in
const privateRoute = [];

export { publishRoute, privateRoute };
