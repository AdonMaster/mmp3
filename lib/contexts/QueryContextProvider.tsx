import {QueryContext} from "@/lib/contexts/QueryContext"
import {ReactNode, useState} from "react"

export default function QueryContextProvider(p: { children: ReactNode }) {

    const [q, setQ] = useState('')

    return <QueryContext.Provider value={{q, setQ}}>
        {p.children}
    </QueryContext.Provider>

}