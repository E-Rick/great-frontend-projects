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
		<div className='flex flex-col w-full gap-5 justify-center items-center'>
			<div className='shadow bg-white p-3 rounded-full'>{icon}</div>
			<div className='flex flex-col items-center gap-2'>
				<h2 className='text-xl font-medium text-primary'>{header}</h2>
				<p className='text-base text-primary'>{subheader}</p>
			</div>
			<div>{actions}</div>
		</div>
	)
}
