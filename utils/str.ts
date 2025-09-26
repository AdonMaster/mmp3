export default {

    isEmail(s: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)
    },

    sanitize(s: string, replacement=''): string {
        return s.replace(/[^a-zA-Z0-9.\-_]/g, replacement)
    }

}