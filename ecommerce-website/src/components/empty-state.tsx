type EmptyStateProps = {
	header: string
	subheader: string
	actions?: React.ReactNode
	icon?: React.ReactNode
}

export const EmptyState = ({
	header,
	subheader,
	actions,
	icon,
}: EmptyStateProps) => {
	return (
		<div className='flex flex-col items-center justify-center flex-auto w-full h-full gap-5 m-auto lg:flex-grow-0'>
			<div className='p-3 bg-white rounded-full shadow'>{icon}</div>
			<div className='flex flex-col items-center gap-2'>
				<h2 className='text-xl font-medium text-primary'>{header}</h2>
				<p className='text-base text-primary'>{subheader}</p>
			</div>
			<div>{actions}</div>
		</div>
	)
}
