import Home from '../pages/Home';

import Error404 from '../pages/Error404';

import config from '../config/index';

const publishRoute = [
    { path: config.Routes.home, component: Home },

    { path: config.Routes.error, component: Error404, layout: null },
];

// required sign in
const privateRoute = [];

export { publishRoute, privateRoute };
