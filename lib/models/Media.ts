export type MediaType = 'image'
export class Media {

    constructor(
        public id: number,
        public type: MediaType,
        public uri: string,
        public server: string,
        public owner: string|null
    ) {
    }
}
