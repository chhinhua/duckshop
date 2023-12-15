import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

import Image from '../../../../components/Image';
import config from '../../../../config';
import { getOrderByID } from '../../../../apis/orderApi';
import IOrder from '../../../../interface/order';
import { Button } from '@mui/material';
const Detail = () => {
    const navigate = useNavigate();
    // handle get id
    const location = useLocation();
    const idProduct = location.hash.substring(1);
    // set product
    const [order, setOrder] = useState<IOrder>();

    // handle get data
    const getOrder = async (id: number) => {
        try {
            if (idProduct && !isNaN(+idProduct)) {
                // tồn tai ma san pham và phải là số
                const response = await getOrderByID(id);

                if (response.status === 200) {
                    setOrder(response.data);
                } else {
                    navigate(config.Routes.profile + '#' + config.PageInProfile.historyPaymentProfile);
                }
            } else {
                navigate(config.Routes.profile + '#' + config.PageInProfile.historyPaymentProfile);
            }
        } catch {
            toast.error('Đang bảo trì');
        }
    };
    useEffect(() => {
        getOrder(+idProduct);
    }, [idProduct]);
    return (
        <>
            <table className="border-collapse border border-slate-400 mx-auto my-20 w-5/6">
                <caption className="caption-top pb-10 font-bold text-2xl">
                    <span className="float-right">
                        <Link to={config.Routes.profile + '#' + config.PageInProfile.historyPaymentProfile}>
                            <Button variant="contained">Quay lại</Button>
                        </Link>
                    </span>
                    Thông tin chi tiết đơn hàng
                </caption>
                <thead>
                    <tr>
                        <th className="p-5 text-left text-xl bg-slate-200">Chi tiết đơn hàng</th>
                        <th className="p-5 text-left text-xl bg-slate-200"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border border-slate-300 p-5 font-bold text-lg">Ngày xuất đơn</td>
                        <td className="border border-slate-300 p-5">{order?.createdDate}</td>
                    </tr>

                    <tr>
                        <td className="border border-slate-300 p-5 font-bold text-lg">Trạng thái</td>
                        <td className="border border-slate-300 p-5 text-red-500">{order?.status}</td>
                    </tr>
                    <tr>
                        <td className="border border-slate-300 p-5 font-bold text-lg">Địa chỉ nhận hàng</td>
                        <td className="border border-slate-300 p-5">
                            {order?.address.orderDetails}, {order?.address.ward}, {order?.address.district},
                            {order?.address.city}
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-slate-300 p-5 font-bold text-lg">Hình thức thanh toán</td>
                        <td className="border border-slate-300 p-5">{order?.paymentType}</td>
                    </tr>
                    <tr>
                        <td className="border border-slate-300 p-5 font-bold text-lg">Ghi chú</td>
                        <td className="border border-slate-300 p-5">{order?.note}</td>
                    </tr>
                    <tr>
                        <td className="border border-slate-300 p-5 font-bold text-lg">Tổng sản phẩm</td>
                        <td className="border border-slate-300 p-5">{order?.totalItems}</td>
                    </tr>
                    <tr>
                        <td className="border border-slate-300 p-5 font-bold text-lg">Thành tiền</td>
                        <td className="border border-slate-300 p-5">
                            <div className="text-base not-italic font-medium text-red-500 flex ">
                                <span className="text-sm pr-0.5">đ</span>
                                {order?.total.toLocaleString('vi-VN')}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Table size="small" aria-label="purchases">
                <TableHead>
                    <TableRow>
                        <TableCell>Sản phẩm</TableCell>
                        <TableCell align="left">Tên</TableCell>
                        <TableCell align="center">Số lượng</TableCell>
                        <TableCell align="left">Giá cho 1 sản phẩm</TableCell>
                        <TableCell align="left">Tổng giá</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {order?.orderItems.map((item2, index2) => (
                        <TableRow
                            key={index2}
                            sx={{
                                '&:last-child td, &:last-child th': {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell component="th" scope="row">
                                <Link to={config.Routes.detailProduct + '#' + item2.product.id}>
                                    <div className="h-16 w-16 sm:h-24 sm:w-24 lg:h-36 lg:w-36 overflow-hidden">
                                        <Image src={item2.imageUrl} className="w-full h-full object-cover" />
                                    </div>
                                </Link>
                            </TableCell>
                            <TableCell align="left">
                                <div className="text-md font-medium">{item2.product.name}</div>
                                <span className="font-semibold text-base">Phân loại: </span>

                                {item2.sku.optionValues.map((item3, index3) => (
                                    <span key={index3}>
                                        {item3.valueName}
                                        {index3 < item2.sku.optionValues.length - 1 ? ' - ' : ''}
                                    </span>
                                ))}
                            </TableCell>
                            <TableCell align="center">{item2.quantity} </TableCell>
                            <TableCell align="left">
                                <div className="text-base not-italic font-medium text-red-500 flex ">
                                    <span className="text-sm pr-0.5">đ</span>
                                    <span> {item2.price.toLocaleString('vi-VN')}</span>
                                </div>
                            </TableCell>
                            <TableCell align="left">
                                <div className="text-base not-italic font-medium text-red-500 flex">
                                    <span className="text-sm pr-0.5">đ</span>
                                    <span> {item2.subTotal.toLocaleString('vi-VN')}</span>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
};

export default Detail;
