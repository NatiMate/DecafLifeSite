import { error, json } from '@sveltejs/kit';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import type { RequestHandler } from './$types';

export async function POST({ request, params }) {
	try {
		const formData = await request.formData();
		const image = formData.get('image') as File;

		if (!image) {
			throw error(400, 'No image provided');
		}

		// Create directory if it doesn't exist
		const uploadDir = join(process.cwd(), 'static', 'images', params.name);
		await mkdir(uploadDir, { recursive: true });

		// Generate unique filename
		const filename = `${Date.now()}-${image.name}`;
		const filepath = join(uploadDir, filename);

		// Convert File to ArrayBuffer and then to Buffer
		const arrayBuffer = await image.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);

		// Write file to disk
		await writeFile(filepath, buffer);

		// Return the public URL
		return new Response(
			JSON.stringify({
				url: `/images/${params.name}/${filename}`
			}),
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
	} catch (err) {
		console.error('Error uploading file:', err);
		throw error(500, 'Error uploading file');
	}
}

export const DELETE: RequestHandler = async ({ params }) => {
	const { name } = params;

	try {
		// Implement your logic to delete the article from the database or file system
		// For example:
		// await deleteArticleFromDatabase(name);

		return json({ success: true });
	} catch (error) {
		console.error('Error deleting article:', error);
		return json({ success: false, error: 'Failed to delete article' }, { status: 500 });
	}
};
