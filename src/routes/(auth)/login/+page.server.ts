import axios from 'axios';
import type { Actions } from './$types';
import { loginSchema } from './schema';
import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async (event) => {
		const { request } = event;
		const data = await request.formData();

		const parsedData = loginSchema.safeParse({
			email: data.get('email'),
			password: data.get('password')
		});

		if (!parsedData.success) {
			return {
				errors: parsedData.error.formErrors.fieldErrors,
				data: parsedData.data
			};
		}

		try {
			const res = await axios.post('http://athenapublic.local/api/auth/login', {
				email: parsedData.data.email,
				senha: parsedData.data.password
			});

			if (res.status === 200 && res.data.success) {
				const maxAge = res.data.expiresIn;
				event.cookies.set('session', res.data.token, {
					maxAge,
					path: '/',
					sameSite: 'strict',
					secure: true,
					httpOnly: true
				});

				return {
					success: true,
					redirect: '/app'
				};
			}

			return {
				message: 'Email ou senha inválidos',
				data: parsedData.data
			};
		} catch (error) {
			console.log(error);
			return {
				message: 'Ocorreu um erro inesperado',
				data: parsedData.data
			};
		}
	}
} satisfies Actions;
