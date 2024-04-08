import api from '$lib/server/api';
import formUtils from '$lib/server/form-utils.js';

export const load = async () => {
	return { bookmarks: await api.bookmarks.query() };
};

export const actions = {
	'bookmarks/create': async ({ request }) => {
		const data = await request.formData();

		const name = formUtils.getString(data, 'name');
		if (typeof name === 'object') return name;

		const href = formUtils.getString(data, 'href');
		if (typeof href === 'object') return href;

		await api.bookmarks.create({ name, href });
	},
	'bookmarks/update': async ({ request }) => {
		const data = await request.formData();

		const id = formUtils.getNumber(data, 'id');
		if (typeof id === 'object') return id;

		const name = formUtils.getString(data, 'name');
		if (typeof name === 'object') return name;

		const href = formUtils.getString(data, 'href');
		if (typeof href === 'object') return href;

		await api.bookmarks.update(id, { name, href });
	},
	'bookmarks/delete': async ({ request }) => {
		const data = await request.formData();

		const id = formUtils.getNumber(data, 'id');
		if (typeof id === 'object') return id;

		await api.bookmarks.remove(id);
	},
	'bookmarks/check': async ({ request }) => {
		const data = await request.formData();

		const id = formUtils.getNumber(data, 'id');
		if (typeof id === 'object') return id;

		const finished = formUtils.getBoolean(data, 'finished');
		if (typeof finished === 'object') return finished;

		await api.bookmarks.check(id, finished);
	},
};
