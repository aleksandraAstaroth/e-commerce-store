import { Header } from '@/layout/header/header'
import { Page } from '@/layout/page/page'
import '@/styles/globals.css'
import { NextPage } from 'next'
import { SessionProvider, useSession } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { Montserrat } from 'next/font/google'
import { ReactElement, ReactNode, useEffect, useRef } from 'react'

const montserrat = Montserrat({
	subsets: ['latin'],
	display: 'swap',
	weight: ['300', '400', '500', '600', '700'],
})

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement, props: P) => ReactNode
}

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout
}

export default function App({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
	const getLayout = Component.getLayout ?? (page => page)
	console.log('APP SESSION:', session)
	return (
		<SessionProvider session={session}>
			<main className={montserrat.className}>
				<Header />
				<Page>{getLayout(<Component {...pageProps} />, pageProps)}</Page>
			</main>
			<ForceRefresh />
		</SessionProvider>
	)
}

function ForceRefresh() {
	const { status } = useSession()
	const wasAuthenticated = useRef(false)

	useEffect(() => {
		if (status === 'authenticated') {
			wasAuthenticated.current = true
		}

		if (wasAuthenticated.current && status === 'unauthenticated') {
			window.location.reload()
		}
	}, [status])

	return null
}
