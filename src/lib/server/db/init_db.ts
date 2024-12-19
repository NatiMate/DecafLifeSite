import { env } from '$env/dynamic/private';
import { createUser } from '$lib/server/user_creation';

export const initDb = async () => {
	await createUser(env.ADMIN_USERNAME, env.ADMIN_PW);
};
