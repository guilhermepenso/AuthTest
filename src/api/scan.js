import axios from 'axios';
import { API_ENDPOINT } from '@env';

const API_URL = API_ENDPOINT; // Replace with your actual endpoint

export const scanProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/products`);
        console.log('Products:', response.data.products);
        return response.data.products
        // Handle the retrieved products (e.g., update state)
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};