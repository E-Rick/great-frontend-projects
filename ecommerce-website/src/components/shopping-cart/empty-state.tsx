import { EmptyState } from '@/components/empty-state'
import { Button } from '@/components/ui/button'
import React from 'react'
import Image from 'next/image'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { RiArrowRightLine } from 'react-icons/ri'

type ShoppingCartEmptyStateProps = {}

// TODO: Fix desktop responsive
export const ShoppingCartEmptyState = (props: ShoppingCartEmptyStateProps) => {
	return (
		<>
			<div className='flex flex-col flex-auto gap-8 lg:flex-row'>
				<EmptyState
					icon={<MdOutlineShoppingCart size={24} className='text-brand' />}
					header='Your case is empty'
					subheader="Let's go explore some products"
					actions={
						<Button>
							Explore Products <RiArrowRightLine size={16} />
						</Button>
					}
				/>
				<div className='lg:basis-[696px] lg:shrink-0 outline outline-1 outline-neutral-200'>
					<Image
						src='/shopping-cart.webp'
						alt='A collection of shopping carts lined up.'
						className='object-cover object-center h-[180px] md:h-[320px] md:w-full lg:w-auto lg:h-full'
						width={696}
						height={432}
					/>
				</div>
			</div>
		</>
	)
}
