import AuthSignIn from "@/components/auth/auth.signin"
import '@/styles/app.css'
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/(user)/api/auth/auth.options";
import { redirect } from 'next/navigation'

const SignInPage = async () => {

    const session = await getServerSession(authOptions)
    if (session) {
        redirect('/')
    }
    return (
        <>
            <AuthSignIn />
        </>
    )
}

export default SignInPage;