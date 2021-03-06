export class Service {

    constructor(resource) {
        this._resource = resource;
    }

    findAll(queryParams = {}) {
        return this._resource
            .query(queryParams)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível listar.');
            });
    }

    remove(id) {
        return this._resource
            .delete({ id })
            .then(null, err => {
                console.log(err);
                throw new Error('Não foi possível remover.');
            });
    }

    save(document) {
        if (document._id) {
            return this._resource.update({ id: document._id }, document);
        } else {
            return this._resource.save(document);
        }
    }
}