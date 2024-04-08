import { env } from '$env/dynamic/private';
import { error } from '@sveltejs/kit';

/**
 * @typedef {import('$lib/server/db/schema.js').SelectBookmarkWithTags} SelectBookmarkWithTags
 */

const baseUrl = env.API_SERVICE_URL;
const bookmarksUrl = `${baseUrl}/bookmarks`;

const noBodyHeaders = new Headers({
	'Content-Type': 'application/json',
	Authorization: `Bearer ${env.BEARER_TOKEN}`,
});

const bodyHeaders = new Headers({
	'Content-Type': 'application/json',
	Authorization: `Bearer ${env.BEARER_TOKEN}`,
});

/**
 * @param {string | null} q
 * @returns {Promise<Array<SelectBookmarkWithTags>>}
 */
async function query(q = null) {
	try {
		// signal
		const controller = new AbortController();
		const timer = setTimeout(() => controller.abort(), 5000);

		const input = q !== null ? `${bookmarksUrl}?q=${q}` : bookmarksUrl;
		const response = await fetch(input, {
			method: 'GET',
			signal: controller.signal,
			headers: noBodyHeaders,
		});

		clearTimeout(timer);

		if (!response.ok) {
			console.log(response);
			error(500, 'Failed to fetch bookmarks');
		}

		return response.json();
	} catch (e) {
		error(500, 'Failed to fetch bookmarks');
	}
}

/**
 * @param {number} id
 */
async function remove(id) {
	try {
		// signal
		const controller = new AbortController();
		const timer = setTimeout(() => controller.abort(), 5000);

		const response = await fetch(`${bookmarksUrl}/${id}`, {
			method: 'DELETE',
			headers: noBodyHeaders,
		});
		clearTimeout(timer);

		if (!response.ok) {
			error(500, 'Failed to remove bookmark');
		}
	} catch (e) {
		error(500, 'Failed to remove bookmark');
	}
}

/**
 * @param {number} id
 * @param {{name: string; href: string}} body
 */
async function update(id, body) {
	try {
		// signal
		const controller = new AbortController();
		const timer = setTimeout(() => controller.abort(), 5000);

		const response = await fetch(`${bookmarksUrl}/${id}`, {
			method: 'PUT',
			body: JSON.stringify(body),
			headers: bodyHeaders,
		});
		clearTimeout(timer);

		if (!response.ok) {
			error(500, 'Failed to update bookmark');
		}
	} catch (e) {
		error(500, 'Failed to update bookmark');
	}
}

/**
 * @param {number} id
 * @param {boolean} finished
 */
async function check(id, finished) {
	try {
		// signal
		const controller = new AbortController();
		const timer = setTimeout(() => controller.abort(), 5000);

		const response = await fetch(`${bookmarksUrl}/${id}/check/${finished}`, {
			method: 'PUT',
			headers: noBodyHeaders,
		});
		clearTimeout(timer);

		if (!response.ok) {
			error(500, 'Failed to check bookmark');
		}
	} catch (e) {
		error(500, 'Failed to check bookmark');
	}
}

/**
 * @param {{name: string; href: string}} body
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
			error(500, 'Failed to create bookmark');
		}
	} catch (e) {
		error(500, 'Failed to create bookmark');
	}
}

export { query, remove, update, check, create };
