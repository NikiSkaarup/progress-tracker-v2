import bun, { env } from 'bun';

const baseUrl = env.API_SERVICE_URL;
const bookmarksUrl = `${baseUrl}/bookmarks`;
const bodyHeaders = new Headers({
	'Content-Type': 'application/json',
	Authorization: `Bearer ${env.BEARER_TOKEN}`,
});

/**
 * @param {{name: string; href: string;}} body
 */
async function create(body) {
	try {
		// signal
		const controller = new AbortController();
		const timer = setTimeout(() => controller.abort(), 5000);
		const response = await fetch(`${bookmarksUrl}`, {
			method: 'POST',
			body: JSON.stringify(body),
			headers: bodyHeaders,
		});
		clearTimeout(timer);

		if (!response.ok) {
			console.error('Failed to create bookmark');
		}
	} catch (e) {
		console.error('Failed to create bookmarks');
	}
}

const text = await bun.file('./bookmarks.json').text();

const bookmarks = JSON.parse(text);

if (!Array.isArray(bookmarks)) {
	console.log('Bookmarks is not an array');
	process.exit(1);
}

for (let i = bookmarks.length; i--; ) {
	const bookmark = bookmarks[i];
	await create(bookmark);
}
