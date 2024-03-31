import { json } from '@sveltejs/kit';

export const GET = async () =>
	json({
		name: 'Niki Wix Skaarup',
		short_name: 'NWS',
		display: 'browser',
		background_color: '#141141',
		theme_color: '#371D85',
		description: 'Portfolio / Blog',
		icons: [],
		related_applications: []
	});
