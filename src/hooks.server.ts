import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	let session = null;
	const sessionCookie = event.cookies.get('session');
	// check if the cookie exist, and if exists, parse it to the session variable
	if (sessionCookie != undefined && sessionCookie != null) {
		session = sessionCookie;
	}
	const url = new URL(event.request.url);

	// validate the session existence and if the path is acceesible
	if (!session && !isPathAllowed(url.pathname)) {
		throw redirect(302, '/login');
	}

	if (session) {
		//set the session to the locals (i explain this later on the article)
		event.locals.session = JSON.parse(Buffer.from(session.split('.')[1], 'base64').toString());

		// redirect user if he is already logged if he try to access login or signup
		if (url.pathname == '/signup' || url.pathname == '/login') {
			throw redirect(302, '/app');
		}
	}

	let theme = event.cookies.get('theme');

	if (!theme) {
		event.cookies.set('theme', 'light', {
			path: '/',
			maxAge: 60 * 60 * 24 * 365, // one year
			httpOnly: false,
			sameSite: 'strict'
		});

		theme = 'light';
	}

	if (theme !== 'light' && theme !== 'dark') {
		theme = 'light';
		event.locals.theme = 'light';
	} else {
		event.locals.theme = theme;
	}

	return await resolve(event, {
		transformPageChunk: ({ html }) => {
			return html.replace('%isDark%', theme === 'dark' ? theme : '').replace('%theme%', theme);
		}
	});
};

// define the routes of we want to be possible to access without auth
const public_paths = ['/signup', '/login', '/'];

// function to verify if the request path is inside the public_paths array
function isPathAllowed(path: string) {
	return public_paths.some(
		(allowedPath) => path === allowedPath || path.startsWith(allowedPath + '/')
	);
}
