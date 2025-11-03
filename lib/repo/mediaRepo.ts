import {SQLiteDatabase} from "expo-sqlite"
import {Media, MediaType} from "@/lib/models/Media"
import F from "@/lib/files/F"
import {ImageManipulator, SaveFormat} from 'expo-image-manipulator'

class MediaRepo {

    async create(db: SQLiteDatabase, uri: string, type: MediaType, owner: string|null): Promise<Media> {
        const server = 'local'
        const rr = await db.runAsync(
            'INSERT INTO media(uri, type, owner, server) values (?, ?, ?, ?)',
            uri, type, owner, server
        )
        return new Media(rr.lastInsertRowId, type, uri, server, owner)
    }

    async find(db: SQLiteDatabase, id: string|number|undefined): Promise<Media|null> {
        if (!id) return null
        return await db.getFirstAsync<Media>('select * from media where id = ?', id)
    }

    async setOwner(db: SQLiteDatabase, id: number|string|undefined|null, owner: string|null): Promise<number> {
        if (!id) return 0
        const rr = await db.runAsync(
            `update media set owner = ? where id = ?`,
            owner, id
        )
        return rr.changes
    }

    async cleanup(db: SQLiteDatabase) {
        const medias = await db.getAllAsync<Media>(`select * from media where coalesce(owner, '') = '' limit 100`)
        for (const m of medias) {
            F.unlink(m.uri)
            await db.runAsync(`delete from media where id = ?`, m.id!)
        }
    }

    async cloneThumb(db: SQLiteDatabase, full: Media): Promise<Media>
    {
        const thumbRef = await ImageManipulator
            .manipulate(full.uri)
            .resize({width: 200})
            .renderAsync()
        const thumbRes = await thumbRef.saveAsync({compress: 0.7, format: SaveFormat.JPEG})
        const thumbFile = await F.copyToDocuments(thumbRes.uri, 'thumbs', full.id!.toString())

        //
        return this.create(db, thumbFile.uri, 'image', full.owner)
    }

}

export default new MediaRepo()