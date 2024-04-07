import { env } from '$env/dynamic/private';
import formUtils from '$lib/server/form-utils.js';
import { error } from '@sveltejs/kit';

/**
 * @typedef {import('$lib/server/db/schema.js').SelectBookmarkWithTags} SelectBookmarkWithTags
 */

const baseUrl = 'http://localhost:3000';
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
 * @param {string | undefined} query
 * @returns {Promise<Array<SelectBookmarkWithTags>>}
 */
async function fetchBookmarks(query = undefined) {
	try {
		// signal
		const controller = new AbortController();
		const timer = setTimeout(() => controller.abort(), 5000);

		const input = query !== undefined ? `${bookmarksUrl}?q=${query}` : bookmarksUrl;
		const response = await fetch(input, {
			method: 'GET',
			cache: 'force-cache',
			signal: controller.signal,
			headers: noBodyHeaders,
		});

		clearTimeout(timer);

		if (!response.ok) {
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
async function deleteBookmarks(id) {
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
			error(500, 'Failed to delete bookmark');
		}
	} catch (e) {
		error(500, 'Failed to fetch bookmarks');
	}
}

/**
 * @param {number} id
 * @param {string} name
 * @param {string} href
 */
async function updateBookmarks(id, name, href) {
	try {
		// signal
		const controller = new AbortController();
		const timer = setTimeout(() => controller.abort(), 5000);

		const response = await fetch(`${bookmarksUrl}/${id}`, {
			method: 'PUT',
			body: JSON.stringify({ name, href }),
			headers: bodyHeaders,
		});
		clearTimeout(timer);

		if (!response.ok) {
			error(500, 'Failed to update bookmark');
		}
	} catch (e) {
		error(500, 'Failed to fetch bookmarks');
	}
}

/**
 * @param {number} id
 * @param {boolean} finished
 */
async function checkBookmark(id, finished) {
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
 * @param {string} name
 * @param {string} href
 */
async function createBookmarks(name, href) {
	try {
		// signal
		const controller = new AbortController();
		const timer = setTimeout(() => controller.abort(), 5000);

		const response = await fetch(`${bookmarksUrl}`, {
			method: 'POST',
			body: JSON.stringify({ name, href }),
			headers: bodyHeaders,
		});
		clearTimeout(timer);

		if (!response.ok) {
			error(500, 'Failed to delete bookmark');
		}
	} catch (e) {
		error(500, 'Failed to fetch bookmarks');
	}
}

export const load = async () => {
	return { bookmarks: await fetchBookmarks() };
};

export const actions = {
	search: async ({ request }) => {
		const data = await request.formData();

		const search = formUtils.getString(data, 'search');
		if (typeof search === 'object') return search;

		if (search.length === 0) {
			return { bookmarks: await fetchBookmarks() };
		}

		return { bookmarks: await fetchBookmarks(search) };
	},
	'bookmarks/create': async ({ request }) => {
		const data = await request.formData();

		const name = formUtils.getString(data, 'name');
		if (typeof name === 'object') return name;

		const href = formUtils.getString(data, 'href');
		if (typeof href === 'object') return href;

		await createBookmarks(name, href);

		return { bookmarks: await fetchBookmarks() };
	},
	'bookmarks/update': async ({ request }) => {
		const data = await request.formData();

		const id = formUtils.getNumber(data, 'id');
		if (typeof id === 'object') return id;

		const name = formUtils.getString(data, 'name');
		if (typeof name === 'object') return name;

		const href = formUtils.getString(data, 'href');
		if (typeof href === 'object') return href;

		await updateBookmarks(id, name, href);

		return { bookmarks: await fetchBookmarks() };
	},
	'bookmarks/delete': async ({ request }) => {
		const data = await request.formData();

		const id = formUtils.getNumber(data, 'id');
		if (typeof id === 'object') return id;

		await deleteBookmarks(id);

		return { bookmarks: await fetchBookmarks() };
	},
	'bookmarks/check': async ({ request }) => {
		const data = await request.formData();

		const id = formUtils.getNumber(data, 'id');
		if (typeof id === 'object') return id;

		const finished = formUtils.getBoolean(data, 'finished');
		if (typeof finished === 'object') return finished;

		await checkBookmark(id, finished);

		return { bookmarks: await fetchBookmarks() };
	},
};
