/* eslint-disable no-useless-catch */
import Ireview from '../interface/review.js';
import axios from './axiosConfig.js';

export const addReview = async (object: Ireview) => {
    try {
        const response = await axios.post(`/reviews`, {
            content: object.content,
            stars: object.stars, // số nguyễn từ 1 đến 5
            orderId: object.orderId,
            productId: object.productId,
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const getAllReviewWithPagination = async (idProduct: number, pageNo: number, pageSize: number) => {
    try {
        const response = await axios.get(`/reviews?${idProduct}pageNo=${pageNo}&pageSize=${pageSize}`);
        return response;
    } catch (error) {
        throw error;
    }
};
