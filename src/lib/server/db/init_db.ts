import { env } from '$env/dynamic/private';
import { createUser } from '$lib/server/user_creation';

export const initDb = async () => {
	console.log('initDb');
	if (env.ADMIN_USERNAME && env.ADMIN_PW) {
		console.log('Creating admin user');
		await createUser(env.ADMIN_USERNAME, env.ADMIN_PW);
	}
};
