import Icon from '@/components/icon'
import { paths } from '@/helpers/paths/paths'
import { signOut } from 'next-auth/react'

export default function LogoutButton() {
	async function handleSignOut() {
		await signOut({
			callbackUrl: paths.login,
		})
		window.location.href = paths.login
	}

	return (
		<button className="flex group items-center gap-2 p-3 text-xl hover:text-neon-turquoise" onClick={handleSignOut}>
			<Icon src="SignOut" className="group-hover:text-neon-turquoise!" />
			Logout
		</button>
	)
}
