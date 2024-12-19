import fs from 'fs';
import path from 'path';

export async function load({ params }) {
	const { name } = params;

	try {
		const filePath = path.resolve('static/articles', `${name}.json`);
		const fileContent = fs.readFileSync(filePath, 'utf-8');
		console.log('Loaded file: ', fileContent);
		return {
			content: fileContent,
			name
		};
	} catch (error) {
		console.error(`Error loading file ${name}.html:`, error);
		return {
			status: 404
		};
	}
}
