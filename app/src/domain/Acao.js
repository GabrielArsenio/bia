export default class Acao {

    constructor(_id, sequencia = 0, processo, ameaca, procedimento = '') {
        this._id = _id;
        this.sequencia = sequencia;
        this.processo = processo;
        this.ameaca = ameaca;
        this.procedimento = procedimento;
    }
}