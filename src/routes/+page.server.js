import api from '$lib/server/api';
import formUtils from '$lib/server/form-utils.js';

export const load = async ({ url }) => {
	const q = url.searchParams.get('q');
	return { bookmarks: await api.bookmarks.query(q) };
};

export const actions = {
	search: async ({ request }) => {
		const data = await request.formData();

		const search = formUtils.getString(data, 'search');
		if (typeof search === 'object') return search;

		if (search.length === 0) {
			return { bookmarks: await api.bookmarks.query() };
		}

		return { bookmarks: await api.bookmarks.query(search) };
	},
	'bookmarks/create': async ({ request, url }) => {
		const data = await request.formData();

		const name = formUtils.getString(data, 'name');
		if (typeof name === 'object') return name;

		const href = formUtils.getString(data, 'href');
		if (typeof href === 'object') return href;

		await api.bookmarks.create(name, href);

		const q = url.searchParams.get('q');
		return { bookmarks: await api.bookmarks.query(q) };
	},
	'bookmarks/update': async ({ request, url }) => {
		const data = await request.formData();

		const id = formUtils.getNumber(data, 'id');
		if (typeof id === 'object') return id;

		const name = formUtils.getString(data, 'name');
		if (typeof name === 'object') return name;

		const href = formUtils.getString(data, 'href');
		if (typeof href === 'object') return href;

		await api.bookmarks.update(id, name, href);

		const q = url.searchParams.get('q');
		return { bookmarks: await api.bookmarks.query(q) };
	},
	'bookmarks/delete': async ({ request, url }) => {
		const data = await request.formData();

		const id = formUtils.getNumber(data, 'id');
		if (typeof id === 'object') return id;

		await api.bookmarks.remove(id);

		const q = url.searchParams.get('q');
		return { bookmarks: await api.bookmarks.query(q) };
	},
	'bookmarks/check': async ({ request, url }) => {
		const data = await request.formData();

		const id = formUtils.getNumber(data, 'id');
		if (typeof id === 'object') return id;

		const finished = formUtils.getBoolean(data, 'finished');
		if (typeof finished === 'object') return finished;

		await api.bookmarks.check(id, finished);

		const q = url.searchParams.get('q');
		return { bookmarks: await api.bookmarks.query(q) };
	},
};
