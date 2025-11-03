export type Categorized<T> = {category: string, items: T[]}[]

export const arr = {

    categorize<T>(arr: T[], cbCategory: (item: T)=>string): Categorized<T>
    {
        const r: Categorized<T> = []
        for (const item of arr) {
            const category = cbCategory(item)
            const idx = r.findIndex(ri => ri.category.toLowerCase() == category.toLowerCase())
            if (~idx) {
                r[idx].items.push(item)
            } else {
                r.push({ category, items: [item] })
            }
        }
        return r
    }

}