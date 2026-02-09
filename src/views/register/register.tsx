import Card from '@/components/card/card'
import { InputField } from '@/components/input-field/input-field'
import { ADD_USER_MUTATION } from '@/graphql/mutations/add-user'
import { paths } from '@/helpers/paths/paths'
import { useMutation } from '@/hooks/use-mutation/use-mutation'
import { useToast } from '@/hooks/use-toast/use-toast'
import { useFormik } from 'formik'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import router from 'next/router'

export type AuthValues = {
	name?: string
	email: string
	password: string
}

export function validate(values: AuthValues) {
	const errors: Partial<Record<keyof AuthValues, string>> = {}
	if ('name' in values) {
		if (!values.name?.trim()) errors.name = 'Name is required'
	}

	if (!values.email.trim()) errors.email = 'Email is required'
	else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Enter a valid email'

	if (!values.password) errors.password = 'Password is required'
	else if (values.password.length < 6) errors.password = 'Password must be at least 6 characters'

	return errors
}

export default function RegisterView() {
	const { toast } = useToast()
	const [addUser] = useMutation(ADD_USER_MUTATION)

	const formik = useFormik<AuthValues>({
		initialValues: { name: '', email: '', password: '' },
		validate,
		validateOnChange: false,
		validateOnBlur: true,
		onSubmit: async (values, helpers) => {
			try {
				const response = await addUser({
					data: {
						name: values.name,
						email: values.email,
						password: values.password,
						avatar: 'https://as1.ftcdn.net/v2/jpg/03/68/32/68/1000_F_368326871_Ca3Lj0cKayEppeniuxw8YkOzfxBEWYXZ.jpg',
					},
				})

				if (!response) {
					toast({
						type: 'error',
						content: () => 'Registration failed. Please try again.',
					})
					return
				}

				toast({
					type: 'success',
					content: () => 'Account created successfully!',
				})

				const res = await signIn('credentials', {
					email: values.email,
					password: values.password,
					redirect: false,
					callbackUrl: '/products',
				})

				if (!res || res.error) {
					toast({
						type: 'error',
						content: () => 'Login failed after registration. Please try logging in again.',
					})
					await router.push(paths.login)
					return
				}

				await router.push(res.url ?? '/products')
			} catch {
				toast({
					type: 'error',
					content: () => 'Registration failed. Please try again.',
				})
			} finally {
				helpers.setSubmitting(false)
			}
		},
	})

	return (
		<div className="wrapper flex justify-center">
			<Card className="flex flex-col p-10 items-center justify-center gap-10 rounded-2xl w-[500px]">
				<form className="grid justify-center gap-8" onSubmit={formik.handleSubmit}>
					<h1 className="text-neon-pink text-center font-bold text-4xl">Register</h1>
					<div className="grid gap-4">
						<InputField
							label="name"
							name="name"
							value={formik.values.name}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							hasError={!!(formik.touched.name && formik.errors.name)}
							supportingText={formik.touched.name ? formik.errors.name : undefined}
						/>
						<InputField
							label="email"
							name="email"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							hasError={!!(formik.touched.email && formik.errors.email)}
							supportingText={formik.touched.email ? formik.errors.email : undefined}
						/>
						<InputField
							label="password"
							name="password"
							type="password"
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							hasError={!!(formik.touched.password && formik.errors.password)}
							supportingText={formik.touched.password ? formik.errors.password : undefined}
						/>
					</div>
					<div className="grid gap-4">
						<button className="mt-6 w-full bg-neon-pink text-black py-3 rounded-lg font-semibold" type="submit">
							Register
						</button>
						<Link
							href={paths.login}
							className="w-full text-center border-2 border-neon-pink text-white py-3 rounded-lg font-semibold"
						>
							Login
						</Link>
					</div>
				</form>
			</Card>
		</div>
	)
}
