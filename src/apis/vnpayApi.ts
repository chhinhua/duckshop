/* eslint-disable no-useless-catch */
import { IOrderCheckOut } from '../interface/order.js';
const baseURL = 'http://54.168.240.99:5000';
export const checkOutVNPay = (data: IOrderCheckOut, userName: string) => {
    try {
        const response = `${baseURL}/api/v1/vnpay/submit-order?amount=${data.total}&username=${userName}&addressId=${data.addressId}&note=${data.note}`;
        return response;
    } catch (error) {
        throw error;
    }
};

export const makePaymentVNPay = (total: number, orderId: number, addressId: number, note: string) => {
    try {
        const response = `${baseURL}/api/v1/vnpay/pay?amount=${total}&orderId=${orderId}&addressId=${addressId}&note=${note}`;

        return response;
    } catch (error) {
        throw error;
    }
};
