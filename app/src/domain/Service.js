import EventBus from '../event-bus';
import axios from 'axios';

export class Service {

    constructor(basePath) { // Changed from resource to basePath
        this._basePath = basePath; // e.g., 'api/niveis'
    }

    async findAll(queryParams = {}) {
        try {
            // Assuming basePath does not end with a slash if queryParams are used
            const response = await axios.get(this._basePath, { params: queryParams });
            return response.data; // axios puts response data in .data
        } catch (error) {
            console.error("Error in findAll:", error);
            EventBus.$emit('find-failure');
            // Optionally re-throw or return a specific error structure
            throw error;
        }
    }

    async remove(id) {
        try {
            await axios.delete(`${this._basePath}/${id}`);
            EventBus.$emit('remove-success');
        } catch (error) {
            console.error("Error in remove:", error);
            // Handle error, maybe emit another event
            throw error;
        }
    }

    async save(document) {
        try {
            let response;
            if (document._id) {
                response = await axios.put(`${this._basePath}/${document._id}`, document);
            } else {
                response = await axios.post(this._basePath, document);
            }
            EventBus.$emit('save-success');
            return response.data; // axios puts response data in .data
        } catch (error) {
            console.error("Error in save:", error);
            // Handle error
            throw error;
        }
    }
}