import {SQLiteDatabase} from "expo-sqlite"

export default {

    async find<T>(db: SQLiteDatabase, tableName: string, id: number): Promise<T|null> {
        return await db.getFirstAsync<T>(`select * from ${tableName} where id = ?`, id)
    },

}