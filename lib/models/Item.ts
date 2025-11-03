import {Media} from "@/lib/models/Media"
import {SQLiteDatabase} from "expo-sqlite"
import MediaRepo from "@/lib/repo/mediaRepo"
import LightCache from "@/lib/utils/ligth-cache"

export interface ItemAttr {

    id: number
    user_id: string
    category: string
    created_at: Date
    updated_at: Date
    img: number
    thumb: number
    obs: string|null
}

export interface ItemWithMediaAttr extends ItemAttr {
    imgMediaUri: string
    thumbMediaUri: string
}

export class Item implements ItemAttr {

    private cache: Record<string, any> = {}

    constructor(
        public id: number,
        public user_id: string,
        public category: string,
        public created_at: Date,
        public updated_at: Date,
        public img: number,
        public thumb: number,
        public obs: string|null
    ) {
    }

    static fromAttr(attr: ItemAttr) {
        return new Item(
            attr.id,
            attr.user_id,
            attr.category,
            attr.created_at,
            attr.updated_at,
            attr.img,
            attr.thumb,
            attr.obs,
        )
    }

    async loadMedias(db: SQLiteDatabase) {
        this.cache['loadImgMedia'] = await MediaRepo.find(db, this.img)
        this.cache['loadThumbMedia'] = await MediaRepo.find(db, this.thumb)
    }

    get imgMedia(): Media|null {
        return this.cache['loadImgMedia']
    }
    get thumbMedia(): Media|null {
        return this.cache['loadThumbMedia']
    }

}