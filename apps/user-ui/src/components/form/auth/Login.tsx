import Image from 'next/image';
import SHOPPING_LOGO from '../../../assets/login-shop-logo.svg';

const Login = () => (
	<div className='flex items-center'>
		<div className='w-[90vw] lg:w-[22vw] md:w-[33vw] p-7 flex flex-col justify-center'>
			<h3 className='text-lg font-normal text-violet-400'>¡Hola de nuevo!</h3>
			<p className='text-[0.813rem] text-slate-500 mt-3 flex gap-2'>
				¿A&uacute;n no tienes una cuenta?{' '}
				<button
					type='button'
					className='font-semibold text-blue-500 underline cursor-pointer'
				>
					Crear una
				</button>
			</p>
			<p className='text-sm font-semibold text-slate-400'>
				o inicia sesi&oacute;n con tu cuenta
			</p>
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

export default Login;
