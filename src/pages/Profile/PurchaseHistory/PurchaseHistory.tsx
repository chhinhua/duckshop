import S2Baner1 from '../../../assets/img/LandingPage/section-2-1.png';
import S2Baner2 from '../../../assets/img/LandingPage/section-2-2.png';
import S2Baner3 from '../../../assets/img/LandingPage/section-2-3.png';
import S2Baner4 from '../../../assets/img/LandingPage/section-2-4.png';
import S4Baner1 from '../../../assets/img/LandingPage/section-4-1.png';
import S4Baner2 from '../../../assets/img/LandingPage/section-4-2.png';
import S4Baner3 from '../../../assets/img/LandingPage/section-4-3.png';
import Image from '../../../components/Image';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { Fragment, useState } from 'react';

// import Pagination from '@mui/material/Pagination';
interface Product {
    image: string;
    name: string;
    size: string;
    color: string;
    price: number;
}

interface ItemPurchaseHistory {
    date: string;
    hour: string;
    quantityProduct: number;
    priceTotal: number;
    products: Array<Product>;
}

const rows: Array<ItemPurchaseHistory> = [
    {
        date: '1st Septembar, 2023',
        hour: '11:30 PM',
        quantityProduct: 2,
        priceTotal: 1000,
        products: [
            { image: S2Baner1, name: 'Name Product', size: 'L', color: 'red', price: 100 },
            { image: S2Baner2, name: 'Name Product', size: 'L', color: 'red', price: 100 },
        ],
    },
    {
        date: '1st Septembar, 2023',
        hour: '11:30 PM',
        quantityProduct: 2,
        priceTotal: 1000,
        products: [
            { image: S2Baner3, name: 'Name Product', size: 'L', color: 'red', price: 100 },
            { image: S2Baner4, name: 'Name Product', size: 'L', color: 'red', price: 100 },
        ],
    },
    {
        date: '1st Septembar, 2023',
        hour: '11:30 PM',
        quantityProduct: 2,
        priceTotal: 1000,
        products: [
            { image: S4Baner1, name: 'Name Product', size: 'L', color: 'red', price: 100 },
            { image: S4Baner2, name: 'Name Product', size: 'L', color: 'red', price: 100 },
            { image: S4Baner3, name: 'Name Product', size: 'L', color: 'red', price: 100 },
        ],
    },
];

function Row(props: { item: ItemPurchaseHistory }) {
    const { item } = props;
    const [open, setOpen] = useState(false);

    return (
        <Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' }, backgroundColor: open ? '#FFF8EA' : '' }}>
                <TableCell component="th" scope="row">
                    {item.date} at {item.hour}
                </TableCell>
                <TableCell align="left">{item.quantityProduct}</TableCell>
                <TableCell align="left">{item.priceTotal}</TableCell>
                <TableCell>
                    <Button variant="outlined" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Details
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Products</TableCell>
                                        <TableCell align="left">Name</TableCell>
                                        <TableCell align="left">Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {item.products.map((itemChildren: Product, index: number) => (
                                        <TableRow
                                            key={index}
                                            sx={{
                                                '&:last-child td, &:last-child th': {
                                                    border: 0,
                                                },
                                            }}
                                        >
                                            <TableCell component="th" scope="row">
                                                <Image
                                                    src={itemChildren.image}
                                                    className="sm:h-24 sm:w-24 lg:h-36 lg:w-36  h-16 w-16"
                                                />
                                            </TableCell>
                                            <TableCell align="left">
                                                <div className="text-xl font-medium">{itemChildren.name}</div>
                                                <span>Size: {itemChildren.size}</span>
                                                <span className="pl-5">Color: {itemChildren.color}</span>
                                            </TableCell>
                                            <TableCell align="left">{itemChildren.price} $</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

const PurchaseHistory = () => {
    return (
        <div>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer>
                    <Table stickyHeader aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell align="left">Quantity Product</TableCell>
                                <TableCell align="left">Price Total</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/*  */}
                            {/*  */}
                            {/*  */}
                            {rows.map((item, index) => (
                                <Row key={index} item={item} />
                            ))}
                            {/*  */}
                            {/*  */}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
};

export default PurchaseHistory;
