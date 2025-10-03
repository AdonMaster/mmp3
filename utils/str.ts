export default {

    isEmail(s: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)
    },

    sanitize(s: string, replacement=''): string {
        return s.replace(/[^a-zA-Z0-9.\-_]/g, replacement)
    },

    ellipsis(s: string, size: number) {
        const r = s.slice(0, size)
        if (r.length === s.length) return r
        return r + '...'
    }
}