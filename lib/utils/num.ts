export const Num = {

    parseInt(s: string|undefined, def=0) {
        const rr = parseInt(s ?? '')
        if (isNaN(rr)) return def
        return rr
    }

}