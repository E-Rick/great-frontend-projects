import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import './globals.css'

const notoSans = Noto_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Ecommerce Website',
	description: 'GreatFrontEnd Project by Erick Martinez Jr.',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' className={notoSans.className}>
			<body>{children}</body>
		</html>
	)
}
