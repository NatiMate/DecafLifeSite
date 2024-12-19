import { error } from '@sveltejs/kit';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';

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
