import axios from 'axios';

export const queryAlarmesUsuario = async () => {
    try {
        const email = 'teste@gmail.com'; // Substitua pelo email desejado

        const response = await axios.get('https://j9nsmfoeld.execute-api.us-east-1.amazonaws.com/default/getAlarmeUsuario', {
            params: {
                email: email,
            },
        });
        console.log('Dados recebidos:', response.data);
        return response.data.body;
    } catch (error) {
        console.error('Erro ao fazer a solicitação:', error);
        throw error; // Você pode escolher lançar o erro ou retornar uma mensagem de erro personalizada
    }
};
