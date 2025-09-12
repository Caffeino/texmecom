import { Eye, EyeOff } from 'lucide-react';
import { useState, type ChangeEvent } from 'react';

interface InputGroupProps {
	name: string;
	label: string;
	value?: string;
	onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	error?: string;
	type?: string;
	isTextArea?: boolean;
	rows?: number;
	className?: string;
	placeholder?: string;
}

const InputGroup = ({
	name,
	label,
	value,
	onChange,
	error,
	type = 'text',
	isTextArea = false,
	rows = 3,
	className = '',
	placeholder = '',
	...props
}: InputGroupProps) => {
	const [showPassword, setShowPassword] = useState(false);
	const InputType = isTextArea ? 'textarea' : 'input';

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	let boxType;
	if (!isTextArea) {
		boxType = type === 'password' ? (showPassword ? 'text' : 'password') : type;
	}

	return (
		<div className={className}>
			<label
				htmlFor={name}
				className={`text-[0.820rem] font-[500] ${
					error ? 'text-red-400' : 'text-slate-500'
				}`}
			>
				{label}
			</label>
			<div
				className={`input-box ${
					error
						? 'bg-red-50/20 border-red-200 focus-within:border-red-300'
						: 'border border-slate-200 focus-within:border-violet-200'
				}`}
			>
				<InputType
					id={name}
					name={name}
					value={value}
					onChange={onChange}
					rows={isTextArea ? rows : undefined}
					type={boxType}
					className={`w-full bg-transparent outline-none px-4 py-[0.625rem]`}
					placeholder={placeholder}
				/>

				{type === 'password' && (
					<>
						{showPassword ? (
							<Eye
								size={22}
								onClick={() => toggleShowPassword()}
								className='text-sky-400 cursor-pointer m-2'
							/>
						) : (
							<EyeOff
								size={22}
								onClick={() => toggleShowPassword()}
								className='text-slate-400 cursor-pointer m-2'
							/>
						)}
					</>
				)}
			</div>
			{error && <p className='-mt-4 text-xs text-red-400'>{error}</p>}
		</div>
	);
};

export default InputGroup;
