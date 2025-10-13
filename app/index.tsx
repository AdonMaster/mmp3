import {Redirect} from "expo-router"
import sessionRepo from "@/lib/repo/sessionRepo"


export default function Index() {
    if (sessionRepo.user()) return <Redirect href={'/dashboard'}/>
    return <Redirect href={'/session/onboarding'}/>
}