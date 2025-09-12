import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import SHOPPING_LOGO from '../../../assets/login-shop-logo.svg';
import Button from '../../button/Button';
import GoogleButton from '../../button/GoogleButton';
import ErrorMessage from '../../common/ErrorMessage';
import CheckboxGroup from '../../input/CheckboxGroup';
import InputGroup from '../../input/InputGroup';

interface FormData {
	email: string;
	password: string;
}

const Login = () => {
	const [serverError, setServerError] = useState<string | null>(null);
	const [rememberMe, setRememberMe] = useState(false);
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormData>();

	const onSubmit = (data: FormData) => {};

	return (
		<div className='flex items-center'>
			<div className='w-[90vw] lg:w-[22vw] md:w-[33vw] p-7 flex flex-col justify-center'>
				<h3 className='text-lg font-normal text-slate-500 mb-2'>
					Inicio de sesi&oacute;n
				</h3>
				<p className='text-sm text-slate-400 mt-[2px] mb-4'>
					Ingrese sus datos para poder iniciar
				</p>
				{serverError && <ErrorMessage error={serverError} />}
				<form onSubmit={handleSubmit(onSubmit)}>
					<InputGroup
						label='Correo electr&oacute;nico'
						error={errors.email && String(errors.email.message)}
						type='text'
						placeholder='john@example.com'
						{...register('email', {
							required: 'Este campo es obligatorio',
							pattern: {
								value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
								message: 'Proporcione un correo electrónico válido'
							}
						})}
					/>
					<InputGroup
						label='Contrase&ntilde;a'
						error={errors.password && String(errors.password.message)}
						type='password'
						placeholder='Min 8 caracteres'
						{...register('password', {
							required: 'Este campo es obligatorio',
							minLength: {
								value: 8,
								message: 'Este campo debe contener al menos 8 caracteres'
							}
						})}
					/>
					<div className='flex flex-row items-center justify-between mb-3'>
						<CheckboxGroup
							label='Recordarme'
							checked={rememberMe}
							onChange={() => setRememberMe(!rememberMe)}
						/>
						<Link
							href={'/olvide-mi-contrasena'}
							className='text-blue-500 text-[0.813rem]'
						>
							¿Olvidaste tu contrase&ntilde;a?
						</Link>
					</div>
					<Button type='button' variant='primary-outline'>
						Iniciar sesi&oacute;n
					</Button>
				</form>
				<p className='text-[0.813rem] text-slate-500 mt-3 flex gap-2'>
					¿A&uacute;n no tienes una cuenta?{' '}
					<button
						type='button'
						className='font-normal text-blue-500 cursor-pointer'
					>
						Crear una
					</button>
				</p>
				<div className='flex items-center my-2 text-slate-500 text-sm'>
					<div className='flex-1 border-t border-gray-300' />
					<span className='px-3'>o</span>
					<div className='flex-1 border-t border-gray-300' />
				</div>
				<GoogleButton />
			</div>
			<div className='hidden md:block px-2'>
				<Image
					src={SHOPPING_LOGO}
					alt='Login'
					width={0}
					height={0}
					className='h-[21.875rem] w-80 p-2'
				/>
			</div>
		</div>
	);
};

export default Login;
