import ShoppingCart from '@/components/shopping-cart'

export default function Home() {
	return (
		<main className='flex flex-col w-full min-h-screen px-3 py-12 lg:p-24'>
			<ShoppingCart />
		</main>
	)
}
