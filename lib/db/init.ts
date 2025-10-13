import {type SQLiteDatabase} from 'expo-sqlite'
import dbMigrate01 from "@/lib/db/dbMigrate01"
import dbMigrate02 from "@/lib/db/dbMigrate02"
import mediaRepo from "@/lib/repo/mediaRepo"

const DATABASE_VERSION = 2

export async function dbInit(db: SQLiteDatabase) {
    await migrate(db)
    await mediaRepo.cleanup(db)
}

async function migrate(db: SQLiteDatabase): Promise<void> {

    //
    const pragma = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version')
    const currentVersion = pragma?.user_version ?? 0;

    //
    if (currentVersion >= DATABASE_VERSION) return

    // zero
    if (currentVersion < 1) await db.execAsync(dbMigrate01)
    if (currentVersion < 2) await db.execAsync(dbMigrate02)
}


