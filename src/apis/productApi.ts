/* eslint-disable no-useless-catch */
import axios from './axiosConfig.js';

export const registerApi = async (pageNo: number, pageSize: number) => {
    try {
        const response = await axios.get(`products?pageNo=${pageNo}&pageSize=${pageSize}`);

        return response;
    } catch (error) {
        throw error;
    }
};
