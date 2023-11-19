import NextAuth, { DefaultSession, DefaultUser } from "next-auth"
import { JWT } from "next-auth/jwt"


interface IUser {
    _id: string,
    username: string,
    email: string,
    isVerify: boolean,
    type: string,
    role: string,
}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        user: IUser,
        access_token: string,
        refresh_token: string,
        access_expire: number,
        error: string,
    }
}

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: IUser & DefaultSession['user'],
        access_token: string,
        refresh_token: string,
        access_expire: number,
        error: string,
    }

    interface DefaultUser {
        user: IUser & DefaultSession['user'],
        access_token: string,
        refresh_token: string,
        access_expire: number,
        error: string,
    }
}