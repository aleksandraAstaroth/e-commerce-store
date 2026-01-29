import Card from '@/components/card/card'
import { InputField } from '@/components/input-field/input-field'
import { ADD_USER_MUTATION } from '@/graphql/mutations/add-user'
import { paths } from '@/helpers/paths/paths'
import { useMutation } from '@/hooks/use-mutation/use-mutation'
import Link from 'next/link'
import { useState } from 'react'

export default function RegisterView() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [name, setName] = useState('')

	const [addUser] = useMutation(ADD_USER_MUTATION)

	const handleRegister = async () => {
		try {
			const response = await addUser({
				data: {
					email,
					password,
					name,
					avatar: 'https://as1.ftcdn.net/v2/jpg/03/68/32/68/1000_F_368326871_Ca3Lj0cKayEppeniuxw8YkOzfxBEWYXZ.jpg',
				},
			})
		} catch {
			console.log('Registration failed')
		}
	}

	return (
		<div className="wrapper flex justify-center">
			<Card className="p-10 rounded-2xl w-[500px]">
				<div className="grid justify-center gap-6">
					<h1 className="text-neon-pink text-center font-bold text-4xl">Register</h1>
					<div className="grid gap-6">
						<InputField label="name" value={name} onChange={e => setName(e.target.value)} />
						<InputField label="email" value={email} onChange={e => setEmail(e.target.value)} />
						<InputField label="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
					</div>
					<button
						className="mt-6 w-full bg-neon-pink text-black py-3 rounded-lg font-semibold"
						onClick={handleRegister}
					>
						Register
					</button>
					<Link
						href={paths.login}
						className="w-full text-center border-2 border-neon-pink text-white py-3 rounded-lg font-semibold"
					>
						Login
					</Link>
				</div>
			</Card>
		</div>
	)
}
