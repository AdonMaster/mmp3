import {createContext, useContext} from "react"

type QueryContextAttr = {
    q: string
    setQ: (s: string) => void
}
export const QueryContext = createContext<QueryContextAttr|undefined>(undefined)
export function useQueryContext() {
    const context = useContext<QueryContextAttr|undefined>(QueryContext)
    if (! context) throw new Error('Wrap this in QueryContext.Provider')
    return context
}