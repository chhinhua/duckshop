/* eslint-disable no-useless-catch */
import axios from './axiosConfig.js';

export const getAllCategoryWithPagination = async (pageNo?: number, pageSize?: number) => {
    try {
        const params: Record<string, string | number | undefined> = {};

        if (pageNo !== undefined) {
            params['pageNo'] = pageNo;
        }

        if (pageSize !== undefined) {
            params['pageSize'] = pageSize;
        }
        const url = '/categories?' + new URLSearchParams(params as Record<string, string>).toString();
        const response = await axios.get(url);

        return response;
    } catch (error) {
        throw error;
    }
};

export const getCategoryByIDOrSlug = async (idOrSlug: string) => {
    try {
        const response = await axios.get(`/categories/${idOrSlug}`);
        return response;
    } catch (error) {
        throw error;
    }
};
