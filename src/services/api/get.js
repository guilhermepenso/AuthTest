import axios from 'axios';
//import { API_ENDPOINT } from '@env';

const API_URL = process.env.EXPO_PUBLIC_API_ENDPOINT;
console.log('API_URL: ', API_URL);
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
