/** @type PTBookmark */
const bm = {
	id: 1,
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
	...Array.from({ length: 19 }, (_, i) => ({ ...bm, title: `${bm.title} ${i + 2}`, id: i + 2 }))
];

export const load = async () => {
	return {
		bookmarks
	};
};

export const actions = {
	search: async ({ request }) => {
		const resp = await request.formData();
		console.log(resp);

		const searchValue = resp.get('search');
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
	}
};
