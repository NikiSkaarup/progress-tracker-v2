export const GET = async (event) =>
	new Response(`User-agent: *\nAllow: /\n\nSitemap: ${event.url.origin}/sitemap.txt`);
