import Card from '@/components/card/card'
import { InputField } from '@/components/input-field/input-field'
import { IGetUsersQuery, IGetUsersQueryVariables } from '@/generated/schema-types'
import { GET_USERS_QUERY } from '@/graphql/queries/get-users'

import { paths } from '@/helpers/paths/paths'
import { useQuery } from '@/hooks/use-query/use-query'
import { signIn } from 'next-auth/react'
import Link from 'next/link'

import { FormEvent, useState } from 'react'

export default function LoginView() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)

	async function handleLogin(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setError(null)
		setLoading(true)

		const res = await signIn('credentials', {
			email,
			password,
			redirect: true,
			callbackUrl: '/products',
		})

		setLoading(false)

		if (!res || res.error) {
			setError('Invalid email or password')
			return
		}

		window.location.href = res.url ?? '/'
	}
	const { data, isLoading } = useQuery<IGetUsersQuery, IGetUsersQueryVariables>(GET_USERS_QUERY)

	console.log(data)
	return (
		<div className="wrapper flex justify-center">
			<Card className="flex flex-col items-center justify-center gap-10 rounded-2xl w-[500px]">
				<form className="grid justify-center gap-8" onSubmit={handleLogin}>
					<h1 className="text-neon-pink text-center font-bold text-4xl">Login</h1>
					<div className="grid gap-6">
						<InputField label="email" value={email} onChange={e => setEmail(e.target.value)} />
						<InputField label="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
					</div>
					<div className="grid gap-4">
						<button type="submit" className="mt-6 w-full bg-neon-pink text-black py-3 rounded-lg font-semibold">
							Login
						</button>
						<Link
							href={paths.register}
							className="w-full text-center border-2 border-neon-pink text-white py-3 rounded-lg font-semibold"
						>
							Register
						</Link>
					</div>
				</form>
			</Card>
		</div>
	)
}
