/* eslint-disable no-useless-catch */
import axios from './axiosConfig.js';

export const uploadAvatar = async (image: FormData) => {
    try {
        const response = await axios.post(`image/avatar/upload`, image, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};
