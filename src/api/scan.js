import axios from 'axios';
import { API_ENDPOINT } from '@env';

const apiEndpoint = API_ENDPOINT;
// const accessToken = ACCESS_TOKEN;

export const scanProducts = async () => {
    try {
        /*
        const response = await axios.get(`${apiEndpoint}/products`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        */
        const response = await axios.get(`${apiEndpoint}/products`);
        console.log('Products:', response.data.products);
        return response.data.products
    } catch (error) {
        alert('Não foi possível se conectar com o servidor:', error);
    }
};
