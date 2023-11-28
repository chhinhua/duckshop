/* eslint-disable no-useless-catch */
import axios from './axiosConfig.js';

export const getDataStatisticUser = async () => {
    try {
        const response = await axios.get(`/statistic/user/profile`);
        return response;
    } catch (error) {
        throw error;
    }
};
