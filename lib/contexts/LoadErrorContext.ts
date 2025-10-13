import {createContext, useContext} from "react"

type LoadErrorContextAttr = {
    setLoading: (option: boolean)=>void
    setErr: (reason: string)=>void
    reset: ()=>void
}

export const LoadErrorContext = createContext<LoadErrorContextAttr|undefined>(undefined)
export const useLoadErrorContext = (): LoadErrorContextAttr => {
    const context = useContext<LoadErrorContextAttr|undefined>(LoadErrorContext)
    if (! context) throw new Error('Wrap this in LoadErrorContext.Provider')
    return context
}