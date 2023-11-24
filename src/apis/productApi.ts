/* eslint-disable no-useless-catch */
import axios from './axiosConfig.js';

export const getSKUPrice = async (productId: number, color: string, size: string) => {
    try {
        const response = await axios.get(`/products/sku?product_id=${productId}&value_names=${color},${size}`);

        return response;
    } catch (error) {
        throw error;
    }
};

export const getAllProductWithinPagination = async (pageNo: number, pageSize: number) => {
    try {
        const response = await axios.get(`/products?pageNo=${pageNo}&pageSize=${pageSize}`);

        return response;
    } catch (error) {
        throw error;
    }
};

export const getSingleProduct = async (id: number) => {
    try {
        const response = await axios.get(`/products/${id}`);

        return response;
    } catch (error) {
        throw error;
    }
};
