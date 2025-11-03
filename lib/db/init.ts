import {type SQLiteDatabase} from 'expo-sqlite'
import dbMigrate01 from "@/lib/db/dbMigrate01"
import dbMigrate02 from "@/lib/db/dbMigrate02"
import mediaRepo from "@/lib/repo/mediaRepo"
import dbMigrate03Items from "@/lib/db/dbMigrate03Items"
import dbMigrate04ItemDetail from "@/lib/db/dbMigrate04ItemDetail"

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
    if (currentVersion < 3) await db.execAsync(dbMigrate03Items)
    if (currentVersion < 4) await db.execAsync(dbMigrate04ItemDetail)

    console.log('--> db migrated')
}


