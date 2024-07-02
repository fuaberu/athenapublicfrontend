import { redirect } from '@sveltejs/kit';

export const GET = async ({ cookies }) => {
	//set the cookies to null and redirect
	cookies.delete('session', { path: '/' });

	throw redirect(302, '/');
};
