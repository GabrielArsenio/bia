export default class Service {

    constructor(resource) {
        this._resource = resource;
    }

    findAll() {
        return this._resource
            .query()
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível listar.');
            });
    }

    delete(id) {
        return this._resource
            .delete({ id })
            .then(null, err => {
                console.log(err);
                throw new Error('Não foi possível remover.');
            });
    }
}