import axios from 'axios';
import { API_ENDPOINT, ACCESS_TOKEN } from '@env';

const apiEndpoint = API_ENDPOINT;
const accessToken = ACCESS_TOKEN;

export const scanProducts = async () => {
    try {
        const response = await axios.get(`${apiEndpoint}/products`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        console.log('Products:', response.data.products);
        return response.data.products
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};
