import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	console.log('loading user layout event', event.locals.user);
	if (!event.locals.user) {
		return redirect(302, '/login');
	}
	return { user: event.locals.user };
};
