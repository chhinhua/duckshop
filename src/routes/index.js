import Home from '../pages/Home/Home';

import Error404 from '../pages/Error404';

import config from '../config/index';
import Listproducts from '../pages/Listproducts/Listproducts';

const publishRoute = [
    { path: config.Routes.home, component: Home },
    { path: config.Routes.listProducts, component: Listproducts },
    { path: config.Routes.error, component: Error404, layout: null },
];

// required sign in
const privateRoute = [];

export { publishRoute, privateRoute };
