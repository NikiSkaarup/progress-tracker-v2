/**
 * @param {import('@sveltejs/kit').Page} page
 * @returns {string}
 */
export default function queryParam(page) {
	if (!page.url.searchParams.has('q')) {
		return '';
	}

	return `&q=${page.url.searchParams.get('q')}`;
}
