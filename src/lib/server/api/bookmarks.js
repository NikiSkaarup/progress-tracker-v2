import { env } from '$env/dynamic/private';
import { error } from '@sveltejs/kit';

/**
 * @typedef {import('$lib/server/db/schema.js').SelectBookmark} SelectBookmark
 */

const baseUrl = env.API_SERVICE_URL;
const bookmarksUrl = `${baseUrl}/bookmarks`;

const noBodyHeaders = new Headers({
	Authorization: `Bearer ${env.BEARER_TOKEN}`,
});

const bodyHeaders = new Headers({
	'Content-Type': 'application/json',
	Authorization: `Bearer ${env.BEARER_TOKEN}`,
});

/**
 * @returns {Promise<Array<SelectBookmark>>}
 */
async function query() {
	try {
		const response = await fetch(bookmarksUrl, {
			method: 'GET',
			signal: AbortSignal.timeout(5000),
			headers: noBodyHeaders,
		});

		if (!response.ok) {
			console.error(response);
			error(500, 'Failed to fetch bookmarks');
		}

		return response.json();
	} catch (e) {
		console.error(e);
		error(500, 'Failed to fetch bookmarks');
	}
}

/**
 * @param {number} id
 */
async function remove(id) {
	try {
		const response = await fetch(`${bookmarksUrl}/${id}`, {
			method: 'DELETE',
			signal: AbortSignal.timeout(5000),
			headers: noBodyHeaders,
		});

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
		const response = await fetch(`${bookmarksUrl}/${id}`, {
			method: 'PUT',
			body: JSON.stringify(body),
			signal: AbortSignal.timeout(5000),
			headers: bodyHeaders,
		});

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
		const response = await fetch(`${bookmarksUrl}/${id}/check/${finished}`, {
			method: 'PUT',
			signal: AbortSignal.timeout(5000),
			headers: noBodyHeaders,
		});

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
		const response = await fetch(`${bookmarksUrl}`, {
			method: 'POST',
			body: JSON.stringify(body),
			signal: AbortSignal.timeout(5000),
			headers: bodyHeaders,
		});

		if (!response.ok) {
			error(500, 'Failed to create bookmark');
		}
	} catch (e) {
		error(500, 'Failed to create bookmark');
	}
}

export default { query, remove, update, check, create };
