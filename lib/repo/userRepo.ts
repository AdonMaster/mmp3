import {User as UserAuth} from "@firebase/auth"
import {User} from "@/lib/models/User"
import {doc, getDoc, setDoc} from "@firebase/firestore"
import {fbDb} from "@/lib/fb"
import {SQLiteDatabase} from "expo-sqlite"
import {UpdateBuilder} from "@/lib/repo/Builders"

// const
const USERS = 'users'

// export
export default {

    async _grantFirestoreUser(user: UserAuth): Promise<User>
    {
        let userDoc: User = {
            id: user.uid,
            email: user.email!,
            name: user.displayName ?? '',
            avatar: '', phone: '', city: '', uf: '', insta: ''
        }
        const userDocReference = await getDoc(doc(fbDb, USERS, user.uid))
        if (userDocReference.exists()) {
            userDoc = userDocReference.data() as User
        } else {
            await setDoc(doc(fbDb, 'users', user.uid), userDoc)
        }
        return userDoc
    },

    async grant(db: SQLiteDatabase, user: User): Promise<User>
    {
        const model = await db.getFirstAsync<User>('select * from users where id = ?', user.id)
        if (model) return model

        //
        const rr = await db.runAsync(
            'INSERT INTO users values (?, ?, ?, ?, ?, ?, ?, ?)',
            user.id, user.email, user.name, user.avatar, user.phone, user.city, user.uf, user.insta
        )
        if (rr.changes <= 0) throw new Error('insert user had no changes')
        return user
    },

    async update(db: SQLiteDatabase, id: string, builder: UpdateBuilder<User>): Promise<User|null> {
        if (builder.fields.length <= 0) return null
        //
        const sql = `update users set ${builder.buildSqlFields()} where id = ?`
        const rr = await db.runAsync(sql, ...builder.buildValues(), id)
        if (rr.changes) return await this.find(db, id)
        return null
    },

    async find(db: SQLiteDatabase, id: string): Promise<User|null> {
        return await db.getFirstAsync<User>(`select * from users where id = ?`, id)
    }
}