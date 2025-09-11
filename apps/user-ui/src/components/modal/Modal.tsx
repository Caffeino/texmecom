import { X } from 'lucide-react';
import type { ReactNode } from 'react';

interface ModalProps {
	children: ReactNode;
	open: boolean;
	hideHeader?: boolean;
	title?: string | null;
	onClose: () => void;
}

const Modal = ({
	children,
	open,
	hideHeader = false,
	title,
	onClose
}: ModalProps) => {
	if (!open) return;
	return (
		<div className='fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/40'>
			<div
				className={`relative flex flex-col bg-white dark:bg-linear-to-t dark:from-blue-950 dark:to-sky-900 shadow-lg rounded-lg overflow-hidden`}
			>
				{!hideHeader && (
					<div className='flex items-center justify-between p-4 border-b border-gray-200'>
						<h3 className='md:text-lg font-medium text-gray-900'>
							{title || 'Modal'}
						</h3>
					</div>
				)}

				<button
					type='button'
					className='text-slate-300 bg-transparent hover:bg-slate-200/65 hover:text-primary rounded-lg text-sm w-8 h-8 flex justify-center items-center absolute top-3.5 right-3.5 cursor-pointer'
					onClick={() => onClose()}
				>
					<X />
				</button>

				{/* Modal Body (Scrollable) */}
				<div className='flex-1 overflow-y-auto custom-scrollbar'>
					{children}
				</div>
			</div>
		</div>
	);
};

export default Modal;
