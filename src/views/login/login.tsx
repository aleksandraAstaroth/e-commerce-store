import Card from '@/components/card/card'
import { InputField } from '@/components/input-field/input-field'

import { paths } from '@/helpers/paths/paths'
import { useFormik } from 'formik'
import { signIn } from 'next-auth/react'
import Link from 'next/link'

import { useToast } from '@/hooks/use-toast/use-toast'
import router from 'next/router'
import { AuthValues, validate } from '../register/register'

export default function LoginView() {
	const { toast } = useToast()

	const formik = useFormik<AuthValues>({
		initialValues: { email: '', password: '' },
		validate,
		validateOnChange: true,

		onSubmit: async (values, helpers) => {
			try {
				const res = await signIn('credentials', {
					email: values.email,
					password: values.password,
					redirect: false,
					callbackUrl: '/products',
				})
				console.log(res?.error)

				if (res?.ok) {
					toast({
						type: 'success',
						content: () => 'Login successful! Redirecting to products page...',
					})

					await router.push(paths.products)
				}
				if (res?.error) {
					toast({
						type: 'error',
						content: () => 'Login failed. Please check your credentials and try again.',
					})
				}
			} catch {
				toast({
					type: 'error',
					content: () => 'Login failed. Please check your credentials and try again.',
				})
			} finally {
				helpers.setSubmitting(false)
			}
		},
	})
	return (
		<div className="wrapper flex justify-center">
			<Card className="flex flex-col items-center p-10 justify-center gap-10 rounded-2xl w-[500px]">
				<form className="grid justify-center gap-8" onSubmit={formik.handleSubmit}>
					<h1 className="text-neon-pink text-center font-bold text-4xl">Login</h1>
					<div className="grid gap-6">
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
