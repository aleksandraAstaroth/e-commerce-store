import 'next-auth'
import 'next-auth/jwt'

type UserRole = 'admin' | 'customer'

type SessionUser = {
	id: string
	name?: string | null
	email?: string | null
	image?: string | null
	role?: UserRole | null
}

declare module 'next-auth' {
	interface Session {
		user?: SessionUser
		accessToken?: string
	}

	interface User extends SessionUser {
		accessToken: string
		refreshToken: string
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		user?: SessionUser
		accessToken?: string
		refreshToken?: string
	}
}
