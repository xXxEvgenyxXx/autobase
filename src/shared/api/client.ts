import axios from 'axios';

const apiClient = axios.create({
    baseURL: '/api', // прокси преобразует /api/xxx -> http://api/xxx
    headers: {
        'Content-Type': 'application/json',
    },
});

// Перехватчик ответов: извлекаем data из ответа или выбрасываем ошибку
apiClient.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        const message =
            error.response?.data?.error || error.message || 'Something went wrong';
        return Promise.reject(new Error(message));
    }
);

export default apiClient;