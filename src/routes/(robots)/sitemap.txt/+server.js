export const GET = async (event) => {
	const sitemap = `${event.url.origin}/`;

	return new Response(sitemap);
};
