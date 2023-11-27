import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { useEffect, useState } from 'react';

import { getHistoryOrderForCurrentUser, searchOrderForUser } from '../../../apis/orderApi';
import IOrder from '../../../interface/order';
import config from '../../../config';
import RowTable from './RowTable/RowTable';

// import Pagination from '@mui/material/Pagination';
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

const PurchaseHistory = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [listHistory, setListHistory] = useState<Array<IOrder>>([]);
    // change status
    const [status, setStatus] = useState<string>('');

    const handleChangeStatus = (event: SelectChangeEvent) => {
        setStatus(event.target.value as string);
    };
    // get data
    const handleGetListHistory = async (statusParam: string) => {
        if (statusParam === '') {
            const response = await getHistoryOrderForCurrentUser();
            setListHistory(response.data);
        } else {
            const response = await searchOrderForUser(statusParam);
            setListHistory(response.data);
        }
    };
    useEffect(() => {
        handleGetListHistory(status);
    }, [isLoading, status]);

    return (
        <div>
            <div className="flex items-center font-medium text-lg py-3">
                <span className="w-40">Lọc đơn hàng:</span>
                <FormControl fullWidth>
                    <InputLabel>Trạng thái</InputLabel>
                    <Select value={status} label="Trạng thái" onChange={handleChangeStatus}>
                        <MenuItem value={''}>Tất cả</MenuItem>
                        <MenuItem value={config.StatusOrders.ORDERED}>{config.StatusOrders.ORDERED}</MenuItem>
                        <MenuItem value={config.StatusOrders.PROCESSING}>{config.StatusOrders.PROCESSING}</MenuItem>
                        <MenuItem value={config.StatusOrders.SHIPPED}>{config.StatusOrders.SHIPPED}</MenuItem>
                        <MenuItem value={config.StatusOrders.DELIVERED}>{config.StatusOrders.DELIVERED}</MenuItem>
                        <MenuItem value={config.StatusOrders.CANCELED}>{config.StatusOrders.CANCELED}</MenuItem>
                        <MenuItem value={config.StatusOrders.WAITFORPAY}>{config.StatusOrders.WAITFORPAY}</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer>
                    <Table stickyHeader aria-label="simple table">
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell align="center">Ngày xuất đơn</StyledTableCell>
                                <StyledTableCell align="center">Tổng sản phẩm</StyledTableCell>
                                <StyledTableCell align="left">Thành tiền</StyledTableCell>
                                <StyledTableCell align="left">Trạng thái</StyledTableCell>
                                <StyledTableCell>Chi tiết</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {listHistory.map((item: IOrder, index) => (
                                <RowTable key={index} item={item} setLoading={setLoading} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
};

export default PurchaseHistory;
