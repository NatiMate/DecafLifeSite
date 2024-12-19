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

export const tourSchema = z.object({
	id: z.string(),
	title: z.string(),
	subtitle: z.string(),
	description: z.array(z.string()),
	additionalInfo: z.array(z.string()),
	costs: z.array(z.string()),
	image: z.string(),
	price: z.number().multipleOf(0.01),
	duration: z.number(),
	location: z.string(),
	grouping: z.array(z.string()),
	meetingPoint: z.string(),
	destination: z.string(),
	shopifyId: z.string(),
	shopifyGutscheinVariantId: z.string().optional(),
	shopifyGutscheinProductId: z.string().optional()
});

export const tourPurchaseSchema = z.object({
	participants: z.number().min(1, { message: 'Gib mindestens einen Teilnehmer an' }).max(999).int(),
	merchandiseId: z.string().min(1, { message: 'Bitte wähle einen Termin' })
});

export const couponPurchaseSchema = z.object({
	merchandiseId: z.string().min(1, { message: 'Bitte wähle einen Termin' })
});
