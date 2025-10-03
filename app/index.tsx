import {authStore} from "@/lib/stores/auth-store"
import {Redirect} from "expo-router"


export default function Index() {
    const userEmail = authStore.getString('user.email')

    //
    if (userEmail) return <Redirect href={'/dashboard'}/>
    return <Redirect href={'/session/onboarding'}/>
}