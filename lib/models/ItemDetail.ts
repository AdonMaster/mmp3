export class ItemDetail {

    constructor(
        public id: number|undefined,
        public item_id: number,
        public chave: string,
        public valor: string,
        public position: number
    ) {
    }

}