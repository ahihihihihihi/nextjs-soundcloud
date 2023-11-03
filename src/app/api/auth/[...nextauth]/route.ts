import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { AuthOptions } from "next-auth/core/types";

export const authOptions: AuthOptions = {
    // Configure one or more authentication providers
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        // ...add more providers here
    ],
    callbacks: {
        async jwt({ token, user, account, profile, trigger }) {
            if (trigger === 'signIn' && account?.provider === 'github') {
                //todo
                token.access_token = 'USER';

            }

            return token
        },
        async session({ session, token, user }) {

            session.access_token = token.access_token

            return session
        },

    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }