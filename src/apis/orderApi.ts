/* eslint-disable no-useless-catch */
import { IInfoOrder } from '../interface/order.js';
import axios from './axiosConfig.js';

export const createNewOrder = async (data: IInfoOrder) => {
    try {
        const response = await axios.post('/orders', {
            total: data.total,
            paymentType: data.paymentType,
            note: data.note,
            userId: data.userId,
            address: { id: data.address.id },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const deleteOrderByUser = async (idOrder: string) => {
    try {
        const response = await axios.delete(`/orders/${idOrder}`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const getSingleOrderByID = async (idOrder: string) => {
    try {
        const response = await axios.get(`/orders/${idOrder}`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const updateOrderStatusByID = async (idOrder: string, status: string) => {
    try {
        const response = await axios.put(`/orders/${idOrder}/status?status=${status}`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const getListOrderByUserName = async (userName: string) => {
    try {
        const response = await axios.get(`/orders/user?username=${userName}`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const getListOrderByUserID = async (idUserName: string) => {
    try {
        const response = await axios.get(`/orders/user/${idUserName}`);
        return response;
    } catch (error) {
        throw error;
    }
};
