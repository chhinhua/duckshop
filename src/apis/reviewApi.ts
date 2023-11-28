/* eslint-disable no-useless-catch */
import { IreviewOrder } from '../interface/review.js';
import axios from './axiosConfig.js';

export const addReview = async (object: IreviewOrder) => {
    try {
        const response = await axios.post(`/reviews`, {
            content: object.content,
            stars: object.stars, // số nguyễn từ 1 đến 5
            itemId: object.itemId,
            productId: object.productId,
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const getAllReviewWithPagination = async (
    idProduct: number,
    pageNo: number,
    pageSize: number,
    star?: number | undefined | null,
) => {
    try {
        const params: { [key: string]: string | number } = {
            pageNo: pageNo,
            pageSize: pageSize,
        };
        // Thêm key vào đối tượng nếu key không rỗng
        if (star && (star !== undefined || star !== null)) {
            params['star'] = star;
        }

        const url = `/reviews/${idProduct}?` + new URLSearchParams(params).toString();
        const response = await axios.get(url);

        // const response = await axios.get(`/reviews/${idProduct}?pageNo=${pageNo}&pageSize=${pageSize}`);
        return response;
    } catch (error) {
        throw error;
    }
};
