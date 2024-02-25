import axios from 'axios';
import { API_ENDPOINT } from '@env';

const API_URL = API_ENDPOINT;
export const getProduct = async (productId) => {
    try {
        const response = await axios.get(`${API_URL}/product`, {
            params: { productId },
        });
        console.log(response.data);
        return response.data
    } catch (error) {
        console.error('Error fetching product details:', error);
        throw error;
    }
};
