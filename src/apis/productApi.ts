/* eslint-disable no-useless-catch */
import axios from './axiosConfig.js';

export const getAllProductSearchWithinPagination = async (
    pageNo: number,
    pageSize: number,
    key: string,
    cate: string,
    sort: string,
) => {
    try {
        const params: Record<string, string | number | boolean> = {
            sell: true,
            pageNo: pageNo,
            pageSize: pageSize,
        };

        // Thêm key vào đối tượng nếu key không rỗng
        if (key !== '') {
            params['key'] = key;
        }

        // Thêm sort vào đối tượng nếu sort không rỗng
        if (sort !== '') {
            params['sort'] = sort;
        }

        // Thêm cate vào đối tượng nếu cate không rỗng
        if (cate !== '') {
            params['cate'] = cate;
        }
        const url = '/products/search?' + new URLSearchParams(params as Record<string, string>).toString();

        const response = await axios.get(url);
        // const response = await axios.get(
        //     `/products/search?key=${key}&cate=${cate}&sort=${sort}&pageSize=${pageSize}&pageNo=${pageNo}&sell=true`,
        // );

        return response;
    } catch (error) {
        throw error;
    }
};

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
