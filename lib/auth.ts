import { NEXTAUTH_SECRET } from '@/config';
import { axiosInstance } from '../hooks/useAxios';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'Email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                try {
                    const response = await axiosInstance.post('/auth/login', credentials);
                    const userData = response?.data;
                    const token = userData.accessToken;
                    const user = { ...userData.user, token };
                    return user as any;
                } catch (err) {
                    console.log('First Error', err);
                    return null;
                }
            }
        }),
        GoogleProvider({
            clientId: '337989205449-1nh21102rdppqble729au4o246vdim3i.apps.googleusercontent.com',
            clientSecret: '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',
        })
    ],
    session: { strategy: 'jwt', maxAge: 60 * 60 },
    secret: NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ user, account, credentials }) {
            const { id, email, image, name } = user;
            if (account?.provider === 'google') {
                try {
                    const response = await axiosInstance.post('/auth/google-auth', { id, email, image, name });
                    const userData = response?.data;
                    const token = userData.accessToken;
                    return { ...userData.user, token } as any;
                } catch (err: any) {
                    console.log('Second Error', err);
                    return false;
                }
            }
            else if (account?.provider === 'credentials') {
                try {
                    const response = await axiosInstance.post('/auth/login', credentials);
                    const userData = response?.data;
                    const token = userData.accessToken;
                    const user = { ...userData.user, token };
                    return user as any;
                } catch (err) {
                    console.log('First Error', err);
                    return null;
                }
            }
            return false;
        },
        async jwt({ token, trigger, session, user }) {
            if (user) {
                try {
                    const response = await axiosInstance.post('/auth/google-auth', { id: user.id, email: user.email, image: user.image, name: user.name });
                    const resData = response.data;
                    return { ...resData.user, token: resData.accessToken };
                } catch (e) {
                    // console.log(e);
                }
                return { ...user, ...token }
            } else if (trigger === 'update' && session) {
                return { ...token, ...session };
            }
            return token;
        },
        async session({ session, token, user }) {
            session.user = { ...user, ...token }
            return session;
        },
    },
    pages: {
        signIn: '/login',
        signOut: '/login',
    }
}