import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { logServer } from '$lib/server/util';
import { hash } from '@node-rs/argon2';
import { encodeBase32LowerCase } from '@oslojs/encoding';
import { fail, redirect } from '@sveltejs/kit';

export const createUser = async (username: string, password: string) => {
	if (typeof password !== 'string') {
		throw new Error('Password must be a string');
	}

	const userId = generateUserId();
	const passwordHash = await hash(password, {
		// recommended minimum parameters
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1
	});

	console.log('DB info');
	console.log(db);

	try {
		await db.insert(table.user).values({ id: userId, username, passwordHash });
	} catch (e) {
		logServer({ level: 'error', message: 'Error creating user', error: e, userId });
		return fail(500, { message: 'An error has occurred' });
	}
	return redirect(302, '/demo/lucia');
};

function generateUserId() {
	// ID with 120 bits of entropy, or about the same as UUID v4.
	const bytes = crypto.getRandomValues(new Uint8Array(15));
	const id = encodeBase32LowerCase(bytes);
	return id;
}
