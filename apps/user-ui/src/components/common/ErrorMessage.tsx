import { CircleAlert } from 'lucide-react';

const ErrorMessage = ({ error }: { error: Error | null | string }) => {
	if (!error) return;

	return (
		<div className='flex items-center flex-row gap-3 mb-2 rounded-xs font-semibold border-l-4 border-red-400 bg-red-100 text-red-400 px-4 py-2 text-[0.813rem]'>
			<CircleAlert size={20} />
			{error instanceof Error ? error.message : error}
		</div>
	);
};

export default ErrorMessage;
