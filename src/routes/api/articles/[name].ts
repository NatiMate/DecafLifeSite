import { promises as fs } from 'fs';
import path from 'path';

export async function GET({ params }) {
	console.log('Get call to api');
	const { name } = params;
	const filePath = path.resolve('static', `${name}.html`);

	try {
		const htmlContent = await fs.readFile(filePath, 'utf-8');
		return new Response(htmlContent, {
			headers: { 'Content-Type': 'text/html' }
		});
	} catch (error) {
		return new Response('File not found', { status: 404 });
	}
}
