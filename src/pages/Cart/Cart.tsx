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
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import config from '../../config';
import { useEffect, useState } from 'react';
import { getCartByToken } from '../../apis/cartApi';
import productCart from '../../interface/productCart';
import React from 'react';
import { toast } from 'react-toastify';

import QuantityProduct from './QuantityProduct';

const Cart = () => {
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [listProduct, setListProduct] = useState<Array<productCart>>([]);
    const getListProduct = async () => {
        const response = await getCartByToken();
        if (response.status === 200) {
            setListProduct(response?.data?.cartItems);
            setTotalPrice(response?.data?.totalPrice);
        } else {
            toast.error(response.data.message);
        }
    };
    useEffect(() => {
        getListProduct();
    }, []);

    return (
        <div className="w-11/12 m-auto pt-32">
            <div className="grid grid-cols-12 gap-2">
                {/* start list product */}
                <div className="col-span-12 lg:col-span-8 ">
                    <div className="h-min bg-[#F5F5F5] px-6 py-3 mb-5 rounded">
                        <div className="font-semibold text-lg">Miễn phí vận chuyển</div>
                        <span className="text-sm text-gray-500">
                            Áp dụng cho đơn đặt hàng từ 5.000.000 VNĐ trở lên.
                        </span>
                        <a href="#" className="text-sm ml-5 underline text-gray-700 hover:text-black">
                            Xem chi tiết
                        </a>
                    </div>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{ maxHeight: 610 }}>
                            <Table stickyHeader aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell align="left">Tên</TableCell>
                                        <TableCell align="left">Số lượng</TableCell>
                                        <TableCell align="left">Giá</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {listProduct.map((item, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                <Image
                                                    src={item}
                                                    className="sm:h-24 sm:w-24 lg:h-36 lg:w-36  h-16 w-16"
                                                />
                                            </TableCell>
                                            <TableCell align="left">
                                                <div>{item.product.name}</div>
                                                <span>
                                                    {item.sku?.optionValues?.map((option, index) => (
                                                        <React.Fragment key={index}>
                                                            {option.valueName}
                                                            {index < item.sku.optionValues.length - 1 ? ' - ' : ''}
                                                        </React.Fragment>
                                                    ))}
                                                </span>
                                            </TableCell>
                                            <TableCell align="center">
                                                <QuantityProduct value={item.quantity} />
                                            </TableCell>
                                            <TableCell align="left">{item.subTotal.toLocaleString('vi-VN')}</TableCell>
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
                    <h1 className="text-2xl font-semibold text-center">Tổng chi phí</h1>
                    <div className="grid grid-cols-3">
                        <span className="text-left col-span-2">Tổng tiền Sản phẩm</span>
                        <span className="text-right">{totalPrice.toLocaleString('vi-VN')} VNĐ</span>
                    </div>
                    <div className="grid grid-cols-3">
                        <span className="text-left col-span-2">Dự kiến Giao hàng và Xử lý</span>
                        <span className="text-right">{0} VNĐ</span>
                    </div>
                    <div className="grid grid-cols-3 relative py-10">
                        <span className="absolute left-0 top-5 h-0.5 bg-gray-200 w-full"></span>
                        <span className="text-left col-span-2">Thành tiền</span>
                        <span className="text-right">{(totalPrice + 0).toLocaleString('vi-VN')} VNĐ</span>
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
                            Thanh toán
                        </Button>
                    </Link>
                </div>
                {/* end bill */}
            </div>
        </div>
    );
};

export default Cart;
