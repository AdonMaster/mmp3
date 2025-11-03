import type {ExtractPropString} from "@/@types/generalTypes.js"

export default class LightCache<P=any> {

    private cache = new Map<string, any>()

    retrieve<T>(
        key: ExtractPropString<P> | (string & {}) ,
        cb: () => T, refresh: boolean=false
    ): T {
        if (this.cache.has(key) && !refresh) return this.cache.get(key)
        const v = cb()
        this.cache.set(key, v)
        return v
    }

    async retrievePromise<T>(
        key: ExtractPropString<P> | (string & {}) ,
        cb: () => Promise<T>, refresh: boolean=false
    ): Promise<T> {
        if (this.cache.has(key) && !refresh) return this.cache.get(key)

        const v = await cb()
        this.cache.set(key, v)
        return v
    }

    clear() {
        this.cache.clear()
    }
}