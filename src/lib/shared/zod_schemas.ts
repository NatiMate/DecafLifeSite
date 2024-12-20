import { z } from 'zod';

export const signInSchema = z.object({
	username: z
		.string({ required_error: 'Ein Username ist erforderlich' })
		.min(1, { message: 'Ein Username ist erforderlich' })
		.max(64, { message: 'Username darf nicht länger als 64 Zeichen sein' }),
	password: z
		.string({ required_error: 'Ein Passwort ist erforderlich' })
		.min(1, { message: 'Ein Passwort ist erforderlich' })
		.max(300, { message: 'Passwort darf nicht länger als 300 Zeichen sein' })
});

export const articleSchema = z.object({
	name: z.string(),
	title: z.string(),
	description: z.string(),
	date: z.string(),
	image: z.string(),
	sections: z.array(
		z.object({
			title: z.string(),
			imageName: z.string(),
			content: z.string(),
			subsections: z
				.array(
					z.object({
						title: z.string(),
						content: z.string()
					})
				)
				.optional()
		})
	)
});

export const tourPurchaseSchema = z.object({
	participants: z.number().min(1, { message: 'Gib mindestens einen Teilnehmer an' }).max(999).int(),
	merchandiseId: z.string().min(1, { message: 'Bitte wähle einen Termin' })
});

export const couponPurchaseSchema = z.object({
	merchandiseId: z.string().min(1, { message: 'Bitte wähle einen Termin' })
});
