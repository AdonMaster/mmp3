import {Href, router} from "expo-router"

class Nav {

    constructor(private config: { fallback: Href }) {
    }

    back() {
        if (router.canGoBack()) return router.back()
        return router.replace(this.config.fallback)
    }
}

export const nav = new Nav({ fallback: '/(root)/dashboard' })