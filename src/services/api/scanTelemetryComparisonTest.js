import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
//import { EXPO_PUBLIC_API_ENDPOINT_TELEMETRY_COMPARISON_TEST } from '@env';

const apiEndpoint = process.env.EXPO_PUBLIC_API_ENDPOINT_TELEMETRY_COMPARISON_TEST;
console.log('apiEndpoint: ', apiEndpoint);

export const scanTelemetryComparisonTest = async () => {
    try {
        const token = await SecureStore.getItemAsync('access_token');
        console.log('token: ', token);
        const response = await axios.get(`${apiEndpoint}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.Items
    } catch (error) {
        alert('Não foi possível se conectar com o servidor:', error);
    }
};
