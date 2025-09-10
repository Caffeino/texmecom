import React from 'react';

type SvgProps = React.ComponentPropsWithoutRef<'svg'>;

const SmileIcon: React.FC<SvgProps> = ({ ...props }) => (
	<svg
		width={26}
		height={26}
		viewBox='0 0 96.433 96.433'
		xmlns='http://www.w3.org/2000/svg'
		{...props}
	>
		<path
			d='M24.82 48.678c5.422 0 9.832-6.644 9.832-14.811 0-8.165-4.41-14.809-9.832-14.809s-9.833 6.644-9.833 14.809c0 8.167 4.412 14.811 9.833 14.811m46.786 0c5.422 0 9.833-6.644 9.833-14.811 0-8.165-4.411-14.809-9.833-14.809-5.421 0-9.831 6.644-9.831 14.809 0 8.167 4.411 14.811 9.831 14.811m24.249 7.128a2 2 0 0 0-2.285-.4C81.232 61.29 65.125 64.53 48.214 64.53c-16.907 0-33.015-3.24-45.354-9.123a2 2 0 0 0-2.653 2.69c5.606 11.351 25.349 19.277 48.008 19.277 22.668 0 42.412-7.929 48.012-19.279a2 2 0 0 0-.372-2.289'
			stroke='currentColor'
			strokeWidth={1.5}
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);

export default SmileIcon;
