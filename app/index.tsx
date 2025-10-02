import Onboarding from "@/app/session/onboarding"
import {authStore} from "@/lib/stores/auth-store"
import Dashboard from "@/app/(root)/dashboard"


export default function Index() {
    const userEmail = authStore.getString('user.email')
    if (userEmail) return <Dashboard/>
    return <Onboarding/>
}