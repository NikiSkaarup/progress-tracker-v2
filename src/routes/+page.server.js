/** @type PTBookmark */
const bm = {
	id: '1',
	title: 'Svelte',
	href: 'https://svelte.dev/',
	finished: false,
	started: true,
	updated: false,
	tags: [
		{ name: 'default', variant: 'default' },
		{ name: 'destructive', variant: 'destructive' },
		{ name: 'outline', variant: 'outline' },
		{ name: 'secondary', variant: 'secondary' }
	]
};

/** @type {Array<PTBookmark>} */
const bookmarks = [
	bm,
	...Array.from({ length: 19 }, (_, i) => ({
		...bm,
		title: `${bm.title} ${i + 2}`,
		id: (i + 2).toString(),
		finished: i % 2 === 0 ? true : Math.random() > 0.5,
		started: i % 2 === 0 ? true : Math.random() > 0.5,
		updated: i % 2 === 0 ? true : Math.random() > 0.5
	}))
];

export const load = async () => {
	return {
		bookmarks
	};
};

export const actions = {
	search: async function ({ request }) {
		const data = await request.formData();
		console.log(data);

		const searchValue = data.get('search');
		if (searchValue === null) {
			return { bookmarks };
		}

		const search = searchValue.toString().trim();

		if (search.length === 0) {
			return { bookmarks };
		}

		return {
			bookmarks: bookmarks.filter((bm) => bm.title.includes(search))
		};
	},
	'bookmarks/create': async function ({ request }) {
		const data = await request.formData();
		console.log(data);
		return { bookmarks };
	},
	'bookmarks/update': async function ({ request }) {
		const data = await request.formData();
		console.log(data);
		return { bookmarks };
	},
	'bookmarks/delete': async function ({ request }) {
		const data = await request.formData();
		console.log(data);

		const idValue = data.get('id');

		if (idValue === null) {
			return { error: 'No ID provided' };
		}

		const id = idValue.toString().trim();
		if (id.length === 0) {
			return { error: 'ID is empty' };
		}

		console.log('Deleting bookmark', id, bookmarks.length);
		bookmarks.splice(
			bookmarks.findIndex((bm) => bm.id === id),
			1
		);
		console.log('deleted bookmark', id, bookmarks.length);

		return { bookmarks };
	},
	'bookmarks/check': async function ({ request }) {
		const data = await request.formData();
		console.log(data);
		return { bookmarks };
	}
};
