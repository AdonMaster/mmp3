import * as SecureStore from 'expo-secure-store'
import {User} from "@/lib/models/User"
import userRepo from "@/lib/repo/userRepo"
import {
    createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,
    sendPasswordResetEmail
} from 'firebase/auth'
import {fbAuth} from "@/lib/fb"
import {FirebaseError} from "@firebase/app"
import {SQLiteDatabase} from "expo-sqlite"


//
export default {

    cached: null as User|null,

    user(refresh: boolean=false): User|null
    {
        if (this.cached && !refresh) return this.cached

        //
        const userString = SecureStore.getItem('user')
        if (!userString) return null

        //
        try {
            this.cached = JSON.parse(userString) as User
            return this.cached
        } catch (e) {
        }
        return null
    },

    async setUser(user: User|null)
    {
        this.cached = null
        if (user) {
            SecureStore.setItem('user', JSON.stringify(user))
        } else {
            await SecureStore.deleteItemAsync('user')
        }
    },

    async register(db: SQLiteDatabase, email: string, password: string): Promise<User> {
        try {
            const userCredential = await createUserWithEmailAndPassword(fbAuth, email, password)
            const userFirestore = await userRepo._grantFirestoreUser(userCredential.user)
            return await userRepo.grant(db, userFirestore)
        } catch (e) {
            if (e instanceof FirebaseError) {
                if (e.code === 'auth/email-already-in-use') throw new Error('Usuário já existente. Faça login.')
            }
            throw e
        }
    },

    async login(db: SQLiteDatabase, email: string, password: string): Promise<void> {
        try {
            const userCredential = await signInWithEmailAndPassword(fbAuth, email, password)
            const userFirestore = await userRepo._grantFirestoreUser(userCredential.user)
            const userDb = await userRepo.grant(db, userFirestore)
            //
            await this.setUser(userDb)
        } catch (e) {
            if (e instanceof FirebaseError) {
                if (e.code === 'auth/invalid-credential') throw new Error('Usuário e/ou senha inválido.')
            }
            throw e
        }
    },

    async logoff() {
        try {
            await this.setUser(null)
            await signOut(fbAuth)
        } catch (e) {
        }
    },

    async forgot(email: string) {
        try {
            await sendPasswordResetEmail(fbAuth, email)
        } catch (e) {
            if (e instanceof FirebaseError) {
                console.log(e.code)
            }
            throw e
        }
    }
}