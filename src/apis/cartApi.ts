/* eslint-disable no-useless-catch */
import axios from './axiosConfig.js';

export const addToCart = async (quantity: number, productId: number, skuId?: number) => {
    try {
        const response = await axios.post('/cart', {
            quantity,
            productId,
            skuId,
        });
        return response;
    } catch (error) {
        throw error;
    }
};
export const getCartForSignedInUser = async (idUser: number) => {
    try {
        const response = await axios.get(`/cart/${idUser}`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const clearAllCartItemForSignedInUser = async () => {
    try {
        const response = await axios.delete(`/cart/clear`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const removeListCartItemForSignedInUser = async () => {
    try {
        const response = await axios.delete(`/cart/remove`);
        return response;
    } catch (error) {
        throw error;
    }
};
