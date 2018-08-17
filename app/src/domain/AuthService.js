export class AuthService {

    constructor(resource) {
        this._resource = resource;
    }

    login(document) {
        return this._resource.post('/auth', document)
    }
}