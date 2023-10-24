import S2Baner1 from '../../assets/img/LandingPage/section-2-1.png';
import S2Baner2 from '../../assets/img/LandingPage/section-2-2.png';
import S2Baner3 from '../../assets/img/LandingPage/section-2-3.png';
import S2Baner4 from '../../assets/img/LandingPage/section-2-4.png';
import S4Baner1 from '../../assets/img/LandingPage/section-4-1.png';
import S4Baner2 from '../../assets/img/LandingPage/section-4-2.png';
import S4Baner3 from '../../assets/img/LandingPage/section-4-3.png';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';

import DeleteIcon from '@mui/icons-material/Delete';
import Image from '../../components/Image';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import config from '../../config';

interface ProductCart {
    image: string;
    name: string;
    size: string;
    color: string;
    quantity: number;
    price: number;
}

const rows: Array<ProductCart> = [
    { image: S2Baner1, name: 'Name Product', size: 'L', color: 'red', quantity: 1, price: 100 },
    { image: S2Baner2, name: 'Name Product', size: 'L', color: 'red', quantity: 1, price: 100 },
    { image: S2Baner3, name: 'Name Product', size: 'L', color: 'red', quantity: 1, price: 100 },
    { image: S2Baner4, name: 'Name Product', size: 'L', color: 'red', quantity: 1, price: 100 },
    { image: S4Baner1, name: 'Name Product', size: 'L', color: 'red', quantity: 1, price: 100 },
    { image: S4Baner2, name: 'Name Product', size: 'L', color: 'red', quantity: 1, price: 100 },
    { image: S4Baner3, name: 'Name Product', size: 'L', color: 'red', quantity: 1, price: 100 },
];

const Cart = () => {
    return (
        <div className="w-11/12 m-auto pt-32">
            <div className="grid grid-cols-12 gap-2">
                {/* start list product */}
                <div className="col-span-12 lg:col-span-8 ">
                    <div className="h-min bg-[#F5F5F5] px-6 py-3 mb-5 rounded">
                        <div className="font-semibold text-lg">Free Delivery</div>
                        <span className="text-sm text-gray-500">Applies to orders of ₹ 14 000.00 or more.</span>
                        <a href="#" className="text-sm ml-5 underline text-gray-700 hover:text-black">
                            View details
                        </a>
                    </div>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{ maxHeight: 610 }}>
                            <Table stickyHeader aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell align="left">Name</TableCell>
                                        <TableCell align="left">Quantity</TableCell>
                                        <TableCell align="left">Price</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((item, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                <Image
                                                    src={item.image}
                                                    className="sm:h-24 sm:w-24 lg:h-36 lg:w-36  h-16 w-16"
                                                />
                                            </TableCell>
                                            <TableCell align="left">
                                                <div>{item.name}</div>
                                                <span>Size: {item.size}</span>
                                                <span className="pl-5">Color: {item.color}</span>
                                            </TableCell>
                                            <TableCell align="left">{item.quantity}</TableCell>
                                            <TableCell align="left">{item.price} $</TableCell>
                                            <TableCell align="left">
                                                <IconButton aria-label="delete">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </div>
                {/* end list product */}
                {/* start bill */}
                <div className="col-span-12 mt-10 lg:mt-0 lg:col-span-4 lg:ml-10 space-y-5">
                    <h1 className="text-2xl font-semibold text-center">Summary</h1>
                    <div className="grid grid-cols-3">
                        <span className="text-left col-span-2">Subtotal</span>
                        <span className="text-right">890 $</span>
                    </div>
                    <div className="grid grid-cols-3">
                        <span className="text-left col-span-2">Estimated Delivery & Handling</span>
                        <span className="text-right">Free</span>
                    </div>
                    <div className="grid grid-cols-3 relative py-10">
                        <span className="absolute left-0 top-5 h-0.5 bg-gray-200 w-full"></span>
                        <span className="text-left col-span-2">Total</span>
                        <span className="text-right">890 $</span>
                        <span className="absolute left-0 bottom-5 h-0.5 bg-gray-200 w-full"></span>
                    </div>
                    <Link to={config.Routes.checkOut}>
                        <Button
                            style={{ background: 'black' }}
                            variant="contained"
                            fullWidth
                            color="primary"
                            size="large"
                        >
                            Member Checkout
                        </Button>
                    </Link>
                </div>
                {/* end bill */}
            </div>
        </div>
    );
};

export default Cart;
