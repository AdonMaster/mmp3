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
    },

    random(n: number=16) {
        return this._random(n, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-!@#$%&*()+=?')
    },

    randomAlpha(n: number=16) {
        return this._random(n, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_')
    },

    _random(n: number, charSet: string) {
        let r = '';
        for (let i = 0; i < n; i++) {
            const randomPoz = Math.floor(Math.random() * charSet.length);
            r += charSet.substring(randomPoz,randomPoz+1);
        }
        return r;
    }
}