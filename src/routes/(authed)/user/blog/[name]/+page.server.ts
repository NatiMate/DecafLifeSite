import { articleSchema } from '$lib/shared/zod_schemas';
import { fail } from '@sveltejs/kit';
import fs, { writeFileSync } from 'fs';
import path, { join } from 'path';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export async function load({ params }) {
	const { name } = params;
	const articlesDir = path.resolve('static/articles');
	const files = fs.readdirSync(articlesDir);
	const articles = files
		.filter((file) => file.endsWith('.json'))
		.map((file) => {
			const filePath = path.join(articlesDir, file);
			const content = fs.readFileSync(filePath, 'utf-8');
			return JSON.parse(content);
		});

	const articleForm = await superValidate(zod(articleSchema));
	if (name === 'new') {
		articleForm.data.name = 'new';
		return {
			articleForm
		};
	}

	try {
		const filePath = path.resolve('static/articles', `${name}.json`);
		articleForm.data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
		return {
			articles,
			articleForm
		};
	} catch (error) {
		console.error(`Error loading file ${name}.json:`, error);
		return {
			status: 404,
			articleForm
		};
	}
}

export const actions = {
	saveArticle: async (event) => {
		const { request } = event;
		const articleForm = await superValidate(request, zod(articleSchema));

		if (!articleForm.valid) {
			return fail(400, { articleForm });
		}

		try {
			// Get the absolute path to the static directory
			const staticDir = join(process.cwd(), 'static');
			const filePath = join(staticDir, 'articles', `${articleForm.data.name}.json`);

			// Write the form data to the JSON file
			writeFileSync(filePath, JSON.stringify(articleForm.data, null, 2));

			return {
				success: true,
				articleForm
			};
		} catch (error) {
			console.error('Error saving article data:', error);
			return fail(500, {
				articleForm,
				error: 'Failed to save article data'
			});
		}
	}
};
