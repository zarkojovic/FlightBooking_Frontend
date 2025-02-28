import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_APP_API_BASE_URL, // Ensure you have this in your .env file
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor: Attach Token
apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


export default apiClient;