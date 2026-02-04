import { Divider } from '@/components/divider/divider'
import { Dropdown } from '@/components/dropdown/dropdown'
import Icon from '@/components/icon'
import { paths } from '@/helpers/paths/paths'
import useUser from '@/hooks/use-user'
import Link from 'next/link'
import LogoutButton from './user-header-actions/components/logout-button/logout-button'

export function UserHeaderActions({ compact }: { compact?: boolean }) {
	const { status, user } = useUser()

	return (
		<div className="flex justify-between items-center gap-4">
			{status === 'authenticated' && (
				<Dropdown
					trigger={({ open }) => (
						<button className="px-3 py-2 rounded  text-white">
							<div className="flex gap-1">
								<Icon src="User" />
								{!compact ? (
									<span className="hidden sm:inline">
										Hi <span className="font-semibold text-neon-pink">{user?.name}</span>
									</span>
								) : null}
								{open ? '▲' : '▼'}
							</div>
						</button>
					)}
					renderMenu={() => (
						<div className="w-[200px] justify-items-center items-center  grid">
							<div className="block w-full">
								<Divider />
							</div>
							<LogoutButton />
						</div>
					)}
				></Dropdown>
			)}

			{status !== 'authenticated' && (
				<div className="flex gap-4 ">
					<Link
						href={paths.login}
						className="flex group items-center gap-1 border-2 py-2 px-3 rounded-xl border-outline hover:text-neon-turquoise"
					>
						<Icon src="Login" className=" group-hover:fill-neon-turquoise!" />
						Login
					</Link>
					<Link
						className="flex group items-center gap-1 border-2 py-2 px-3 rounded-xl border-outline hover:text-neon-turquoise"
						href={paths.register}
					>
						<Icon src="SignUp" className="group-hover:text-neon-turquoise group-hover:fill-neon-turquoise!" />
						Sign Up
					</Link>
				</div>
			)}
		</div>
	)
}
