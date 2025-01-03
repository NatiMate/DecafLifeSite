export function formatDate(date: Date): string {
	return date.toLocaleDateString('de-DE', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit'
	});
}
