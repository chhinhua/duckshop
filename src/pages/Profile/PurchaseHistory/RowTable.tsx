import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Cancel from '@mui/icons-material/Cancel';
import ModeComment from '@mui/icons-material/ModeComment';

import { useState } from 'react';

import { toast } from 'react-toastify';
import { updateOrderStatusByID } from '../../../apis/orderApi';
import Image from '../../../components/Image';
import MouseOverPopover from '../../../components/MouseOverPopover/MouseOverPopover';
import ModalReview from './ModalReview/ModalReview';
import IOrder from '../../../interface/order';
import config from '../../../config';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#B3A492',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        padding: 3,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
interface Iprops {
    item: IOrder;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RowTable(props: Iprops) {
    const { item, setLoading } = props;

    const [open, setOpen] = useState(false);
    const [isCancel, setCancel] = useState<boolean>(
        item.status === config.StatusOrders.ORDERED || item.status === config.StatusOrders.WAITFORPAY ? true : false,
    );

    const [isReview, setReview] = useState<boolean>(item.status === config.StatusOrders.DELIVERED ? true : false);

    const handleCancelOrder = async (id: number) => {
        const userConfirmed = window.confirm('Bạn có chắc chắn muốn xóa không?');
        if (userConfirmed) {
            try {
                const response = await updateOrderStatusByID(id, config.StatusOrders.CANCELED);
                if (response.status === 200) {
                    setCancel(false);
                    toast.success(response.data.status);
                    setLoading((prev) => !prev);
                } else {
                    toast.error(response.data.message || response.data);
                }
            } catch (error) {
                toast.error(`${error}`);
            }
        } else {
            toast.info('Hủy xóa');
        }
    };

    // modal
    const [openReview, setOpenReview] = useState(false);

    const handleOpenReview = () => setOpenReview(true);
    const handleCloseReview = () => setOpenReview(false);

    return (
        <>
            <StyledTableRow
                sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                }}
            >
                <StyledTableCell align="center" component="th" scope="row">
                    {item.createdDate}
                </StyledTableCell>
                <StyledTableCell align="center">{item.totalItems}</StyledTableCell>
                <StyledTableCell align="center">
                    <div className="text-base not-italic font-medium text-red-500 flex ">
                        <span className="text-sm pr-0.5">đ</span>

                        {item.total.toLocaleString('vi-VN')}
                    </div>
                </StyledTableCell>
                <StyledTableCell align="left">
                    <span
                        className={`${
                            item.status === config.StatusOrders.DELIVERED
                                ? 'text-green-600 text-base font-semibold'
                                : ''
                        } font-medium `}
                    >
                        {item.status}
                    </span>
                </StyledTableCell>
                <StyledTableCell>
                    <Button variant="outlined" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </Button>
                    {isCancel && (
                        <Button
                            onClick={() => handleCancelOrder(item.id)}
                            variant="contained"
                            sx={{
                                bgcolor: 'red',
                                marginLeft: 1,
                                ':hover': {
                                    bgcolor: '#2B2A4C',
                                },
                            }}
                        >
                            <MouseOverPopover content="Hủy đơn hàng">
                                <Cancel
                                    sx={{
                                        color: 'white',
                                        fontSize: '1rem',
                                        marginRight: 0.3,
                                    }}
                                />
                                <span className="normal-case text-white text-base">Huỷ</span>
                            </MouseOverPopover>
                        </Button>
                    )}
                </StyledTableCell>
            </StyledTableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <div>
                                <Typography fontWeight={600} component="span">
                                    Địa chỉ nhận hàng:
                                </Typography>
                                <Typography component="span">
                                    {item.address.orderDetails}, {item.address.ward}, {item.address.district},
                                    {item.address.city}
                                </Typography>
                            </div>
                            <div>
                                <Typography fontWeight={600} component="span">
                                    Hình thức thanh toán:
                                </Typography>
                                <Typography component="span">{item.paymentType}</Typography>
                            </div>
                            <div>
                                <Typography fontWeight={600} component="span">
                                    Ghi chú:
                                </Typography>
                                <Typography component="span">{item.note}</Typography>
                            </div>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Sản phẩm</TableCell>
                                        <TableCell align="left">Tên</TableCell>
                                        <TableCell align="center">Số lượng</TableCell>
                                        <TableCell align="left">Giá cho 1 sản phẩm</TableCell>
                                        <TableCell align="left">Tổng giá</TableCell>
                                        <TableCell align="center"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {item?.orderItems.map((item2, index2) => (
                                        <TableRow
                                            key={index2}
                                            sx={{
                                                '&:last-child td, &:last-child th': {
                                                    border: 0,
                                                },
                                            }}
                                        >
                                            <TableCell component="th" scope="row">
                                                <Image
                                                    src={item2.imageUrl}
                                                    className="sm:h-24 sm:w-24 lg:h-36 lg:w-36  h-16 w-16"
                                                />
                                            </TableCell>
                                            <TableCell align="left">
                                                <div className="text-md font-medium">{item2.product.name}</div>
                                                {item2.sku.optionValues.map((item3, index3) => (
                                                    <span key={index3}>{item3.valueName} </span>
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
                                            <TableCell>
                                                {isReview && (
                                                    <Button onClick={handleOpenReview} sx={{ width: '20px' }}>
                                                        <MouseOverPopover content="Đánh giá sản phẩm">
                                                            <ModeComment
                                                                sx={{
                                                                    color: 'blue',
                                                                }}
                                                            />
                                                        </MouseOverPopover>
                                                    </Button>
                                                )}
                                                <ModalReview
                                                    open={openReview}
                                                    handleClose={handleCloseReview}
                                                    product={item2.product}
                                                    idOrder={item.id}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}
