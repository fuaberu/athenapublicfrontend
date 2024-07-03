import axios from 'axios';
import type { Actions } from './$types';
import { loginSchema } from './schema';
import { env } from '$env/dynamic/private';

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

		const url = env.ATHENA_API_URL || 'http://athenapublic.local';

		try {
			const res = await axios.post(url + '/api/auth/login', {
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
				message: res.data.msg || 'Erro ao logar. Verifique as credenciais informadas',
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
