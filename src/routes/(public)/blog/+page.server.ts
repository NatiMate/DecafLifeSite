import fs from 'fs';
import path from 'path';

export async function load() {
	const articlesDir = path.resolve('static/articles');
	try {
		const files = fs.readdirSync(articlesDir);
		const articles = files.map((file) => {
			const filePath = path.join(articlesDir, file);
			const content = fs.readFileSync(filePath, 'utf-8');
			return JSON.parse(content);
		});

		// Sort articles by date in descending order
		articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

		return {
			articles
		};
	} catch (error) {
		console.error('Error loading articles:', error);
		return {
			status: 500,
			error: 'Failed to load articles'
		};
	}
}
