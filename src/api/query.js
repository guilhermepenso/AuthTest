import axios from 'axios';
import { API_ENDPOINT } from '@env';

const apiEndpoint = API_ENDPOINT;
export const queryProducts = async () => {
    const params = {
        TableName: 'your-table-name',
    };

    try {
        const response = await axios.post(apiEndpoint, params);
        const products = response.data.products;
        console.log('Products:', products);
        return products;
    } catch (error) {
        console.error('Error calling API:', error);
    }
}
