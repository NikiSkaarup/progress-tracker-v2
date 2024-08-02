import bookmarks from '$lib/server/api/bookmarks.js';
import formUtils from '$lib/server/form-utils.js';

export const load = async () => {
	return { bookmarks: await bookmarks.query() };
};

/** @type {import('./$types').Actions} */
export const actions = {
	'bookmarks/create': async ({ request }) => {
		const data = await request.formData();

		const name = formUtils.getString(data, 'name');
		if (typeof name === 'object') return name;

		const href = formUtils.getString(data, 'href');
		if (typeof href === 'object') return href;

		await bookmarks.create({ name, href });
	},
	'bookmarks/update': async ({ request }) => {
		const data = await request.formData();

		const id = formUtils.getNumber(data, 'id');
		if (typeof id === 'object') return id;

		const name = formUtils.getString(data, 'name');
		if (typeof name === 'object') return name;

		const href = formUtils.getString(data, 'href');
		if (typeof href === 'object') return href;

		await bookmarks.update(id, { name, href });
	},
	'bookmarks/delete': async ({ request }) => {
		const data = await request.formData();

		const id = formUtils.getNumber(data, 'id');
		if (typeof id === 'object') return id;

		await bookmarks.remove(id);
	},
	'bookmarks/check': async ({ request }) => {
		const data = await request.formData();

		const id = formUtils.getNumber(data, 'id');
		if (typeof id === 'object') return id;

		const finished = formUtils.getBoolean(data, 'finished');
		if (typeof finished === 'object') return finished;

		await bookmarks.check(id, finished);
	},
};
