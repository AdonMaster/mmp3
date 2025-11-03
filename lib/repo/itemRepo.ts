import {SQLiteDatabase} from "expo-sqlite"
import {Item, ItemAttr, ItemWithMediaAttr} from "@/lib/models/Item"
import sessionRepo from "@/lib/repo/sessionRepo"
import BaseRepo from "@/lib/repo/BaseRepo"
import {Pair} from "@/lib/types/generalTypes"


const TABLE_ITEM = 'items'

export default {

    async find(db: SQLiteDatabase, id: number): Promise<Item|null> {
        const attrs = await BaseRepo.find<ItemAttr>(db, TABLE_ITEM, id)
        if (attrs) return Item.fromAttr(attrs)
        return null
    },

    async queryByCategory(db: SQLiteDatabase, category: string, q: string): Promise<ItemWithMediaAttr[]> {
        return db.getAllAsync<ItemWithMediaAttr>(`
            select i.*, mImg.uri as imgMediaUri, mThumb.uri as thumbMediaUri
            from items as i
            left join media as mImg on mImg.id = i.img
            left join media as mThumb on mThumb.id = i.thumb
            where i.category like ? order by i.id desc
        `, category)
    },

    async queryCategoryPluck(db: SQLiteDatabase, q: string): Promise<Pair<string, number>[]> {
        const rr = await db.getAllAsync<{ category: string, qty: number }>(`
            select category, count(*) as qty from items order by category 
        `)
        if (rr.length == 1 && rr.at(0)?.qty == 0) return []
        return rr.map(i => ({left: i.category, right: i.qty}))
    },

    async create(
        db: SQLiteDatabase,
        category: string,
        img: number,
        thumb: number,
        obs: string=''
    ): Promise<Item> {
        const userId = sessionRepo.user()?.id ?? ''
        if (! userId) throw new Error('Usuário não encontrado.')

        //
        const now = new Date().toISOString()

        //
        const rr = await db.runAsync(`
            insert into items (user_id, category, created_at, updated_at, img, thumb, obs)
            values (?, ?, ?, ?, ?, ?, ?) 
        `, userId, category, now, now, img, thumb, obs)
        const model = await BaseRepo.find<Item>(db, TABLE_ITEM, rr.lastInsertRowId)
        return model!
    }

}

