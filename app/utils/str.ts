export default {

    isEmail(s: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)
    }

}