import * as auth from '$lib/server/auth';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { signInSchema } from '$lib/shared/zod_schemas';
import { verify } from '@node-rs/argon2';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/server';

export const load = async (event) => {
	if (event.locals.user) {
		return redirect(302, '/user');
	}
	const signInForm = await superValidate(zod(signInSchema));
	return { signInForm };
};

export const actions = {
	login: async (event) => {
		const { request } = event;
		const signInForm = await superValidate(request, zod(signInSchema));

		if (!signInForm.valid) {
			return fail(400, { signInForm });
		}

		// Add your login logic here
		const results = await db
			.select()
			.from(table.user)
			.where(eq(table.user.username, signInForm.data.username));

		const existingUser = results.at(0);
		if (!existingUser) {
			signInForm.errors.password = ['Falscher Username oder Passwort'];
			// Return the error through superForm
			return fail(400, {
				signInForm: {
					...signInForm,
					message: 'Falscher Username oder Passwort'
				}
			});
		}

		const validPassword = await verify(existingUser.passwordHash, signInForm.data.password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});
		if (!validPassword) {
			signInForm.errors.password = ['Falscher Username oder Passwort'];
			// Return the error through superForm
			return fail(400, {
				signInForm: {
					...signInForm,
					message: 'Falscher Username oder Passwort'
				}
			});
		}

		const sessionToken = auth.generateSessionToken();
		const session = await auth.createSession(sessionToken, existingUser.id);
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);

		console.log('redirecting to /user');
		console.log('Setting cookie:', sessionToken, session);
		return redirect(302, '/user');
	}
};
