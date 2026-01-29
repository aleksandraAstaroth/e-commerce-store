import { ILoginMutation, ILoginMutationVariables } from '@/generated/schema-types'
import { LOGIN_MUTATION } from '@/graphql/mutations/login'
import { getGqlPath } from '@/hooks/use-query/use-query'
import { UserRole } from '@/types/next-auth'
import { GraphQLClient } from 'graphql-request'
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
	session: { strategy: 'jwt' },
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: { email: {}, password: {} },
			async authorize(credentials) {
				try {
					if (!credentials?.email || !credentials?.password) return null

					const client = new GraphQLClient(getGqlPath())

					const loginResponse = await client.request<ILoginMutation, ILoginMutationVariables>(LOGIN_MUTATION, {
						email: credentials.email,
						password: credentials.password,
					})

					const accessToken = loginResponse.login.access_token
					const refreshToken = loginResponse.login.refresh_token
					if (!accessToken || !refreshToken) return null

					const res = await fetch('https://api.escuelajs.co/api/v1/auth/profile', {
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					})
					if (!res.ok) {
						console.error('AUTHORIZE: /auth/profile failed', res.status, await res.text())
						return null
					}
					const user = await res.json()

					return {
						id: user.id,
						name: user.name ?? null,
						image: user.avatar ?? null,
						email: user.email ?? null,
						role: (user.role as UserRole) ?? null,
						accessToken,
						refreshToken,
					}
				} catch (error) {
					console.error('AUTHORIZE: error', error)
					return null
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.user = {
					id: user.id,
					name: user.name,
					email: user.email,
					image: user.image,
					role: user.role,
				}
				token.accessToken = user.accessToken
				token.refreshToken = user.refreshToken
			}
			return token
		},

		async session({ session, token }) {
			session.user = token.user
			session.accessToken = token.accessToken
			return session
		},
	},
}

export default NextAuth(authOptions)
