import axios from 'axios';
import EventBus from '../event-bus';
import { router } from '../../routes'; // Import router for redirection

const apiClient = axios.create({
    // baseURL: '/api' // Example: Adjust if there's a common API prefix
});

// Request Interceptor
apiClient.interceptors.request.use(config => {
    // Check if the request URL matches the criteria for adding the token (e.g., starts with 'api/')
    // This check might need adjustment based on actual API URL structure.
    // If baseURL is set on apiClient, config.url will be the relative path.
    if (config.url.startsWith('/api') || config.baseURL && config.url.startsWith(config.baseURL + '/api')) { // Adjust condition as needed
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['X-Access-Token'] = token;
        }
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Response Interceptor
apiClient.interceptors.response.use(response => {
    const tokenHeader = response.headers['x-access-token'];
    if (tokenHeader) {
        localStorage.setItem('token', tokenHeader);
    }
    return response;
}, error => {
    if (error.response && error.response.status === 401) {
        // Redirect to login page
        router.push({ name: 'login' });
    }
    // It's important to return a Promise.reject here or throw the error
    // so that calling code can also handle the error.
    return Promise.reject(error);
});

export class Service {

    constructor(basePath) {
        // basePath would be something like '/users', '/ameacas', etc.
        this._basePath = basePath;
    }

    async findAll(params = {}) {
        try {
            // Assuming queryParams are URL parameters
            const response = await apiClient.get(this._basePath, { params });
            return response.data;
        } catch (error) {
            console.error(`Error in findAll for ${this._basePath}:`, error);
            EventBus.emit('find-failure');
            // It might be useful to throw the error or return a specific error object
            return null; // Or throw error;
        }
    }

    async remove(id) {
        try {
            await apiClient.delete(`${this._basePath}/${id}`);
            EventBus.emit('remove-success');
        } catch (error) {
            console.error(`Error in remove for ${this._basePath}/${id}:`, error);
            // EventBus.emit('remove-failure'); // Consider adding a specific failure event
        }
    }

    async save(document) {
        try {
            let response;
            if (document._id) {
                response = await apiClient.put(`${this._basePath}/${document._id}`, document);
            } else {
                response = await apiClient.post(this._basePath, document);
            }
            EventBus.emit('save-success');
            return response.data;
        } catch (error) {
            console.error(`Error in save for ${this._basePath}:`, error);
            // EventBus.emit('save-failure'); // Consider adding a specific failure event
            throw error; // Re-throw the error to be caught by the caller
        }
    }
}