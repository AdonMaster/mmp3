import F from "@/lib/files/F"

export class UpdateBuilder<T> {
    static f<T>() {
        return new UpdateBuilder<T>()
    }

    private _fields: {field: keyof T, val: T[keyof T]}[] = []

    add<F extends keyof T>(field: F, val: T[F]): UpdateBuilder<T> {
        this._fields.push({field, val})
        return this
    }

    has<F extends keyof T>(field: F): boolean {
        return this._fields.findIndex(fi => fi.field === field) >= 0
    }

    get fields(): { field: keyof T; val: T[keyof T] }[] {
        return this._fields
    }

    buildSqlFields(): string {
        return this._fields.map(m => `${m.field as string} = ?`).join(', ')
    }

    buildValues() {
        return this._fields.map(m => m.val)
    }

}