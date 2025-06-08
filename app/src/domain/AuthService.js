import axios from 'axios';

export class AuthService {

    constructor() {
        // The 'resource' parameter is no longer needed with direct axios usage.
    }

    login(document) {
        // Assuming '/auth' is the correct endpoint.
        // It will use axios.defaults.baseURL if not an absolute URL.
        return axios.post('/auth', document);
    }
}