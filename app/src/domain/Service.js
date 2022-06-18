import EventBus from '../event-bus'

export class Service {

    constructor(resource) {
        this._resource = resource;
    }

    async findAll(queryParams = {}) {
        try {
            const res = await this._resource.query(queryParams)
            return res.json()
        } catch (error) {
            EventBus.$emit('find-failure');
        }
    }

    async remove(id) {
        await this._resource.delete({ id })
        EventBus.$emit('remove-success');
    }

    async save(document) {
        let record = null;

        if (document._id) {
            record = await this._resource.update({ id: document._id }, document);
        } else {
            record = await this._resource.save(document);
        }

        EventBus.$emit('save-success');
        return record
    }
}