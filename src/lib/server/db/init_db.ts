import { env } from '$env/dynamic/private';
import { createUser } from '$lib/server/user_creation';

export const initDb = async () => {
	if (!env.ADMIN_USERNAME || !env.ADMIN_PW) {
		console.error('Admin credentials not found in environment variables');
		return;
	}

	await createUser(env.ADMIN_USERNAME, env.ADMIN_PW);
};
