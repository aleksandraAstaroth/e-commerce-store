import { Header } from '@/layout/header/header'
import { Page } from '@/layout/page/page'
import '@/styles/globals.css'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement, props: P) => ReactNode
}

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
	const getLayout = Component.getLayout ?? (page => page)

	return (
		<div>
			<Header />
			<Page>{getLayout(<Component {...pageProps} />, pageProps)}</Page>
		</div>
	)
}
