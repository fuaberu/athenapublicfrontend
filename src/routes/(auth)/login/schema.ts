import { z } from 'zod';

export const loginSchema = z.object({
	email: z
		.string({ required_error: 'Email é requirido' })
		.min(1, { message: 'Email é requirido' })
		.max(64, { message: 'Email deve ter menos de 64 caracteres' })
		.email({ message: 'Email deve ser um email valido' }),
	password: z
		.string({ required_error: 'Senha é requirida' })
		.min(2, { message: 'Senha deve ter pelo menos 6 caracteres' })
		.max(32, { message: 'Senha deve ter menos de 32 caracteres' })
		.trim()
});
