export default class Processo {

    constructor(_id, descricao = '', nivel, tolerancia) {
        this._id = _id;
        this.descricao = descricao;
        this.nivel = nivel;
        this.tolerancia = tolerancia;
    }
}