import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang="en">
			<Head />
			<body className="antialiased" style={{ backgroundColor: "url('../assets/images/lines.png')" }}>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
