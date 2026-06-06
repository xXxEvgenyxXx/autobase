import axios from 'axios';

const apiClient = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Перехватчик ответов (оставляем как было)
apiClient.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const message =
            error.response?.data?.error || error.message || 'Something went wrong';
        return Promise.reject(new Error(message));
    }
);

export default apiClient;