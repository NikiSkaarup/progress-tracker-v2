import { dev } from '$app/environment';
import colors from '$lib/server/colors';
import { nanoid } from 'nanoid';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const requestId = nanoid();
	event.locals.requestId = requestId;
	performance.mark(requestId);
	const result = await resolve(event);
	performance.measure(`request ${requestId}`, requestId);
	return result;
	// return resolve(event);
}

// export async function handleFetch({ request, fetch }) {
// 	return fetch(request);
// }

/** @type {import('@sveltejs/kit').HandleServerError} */
export async function handleError({ error, event, status, message }) {
	console.error('An error occurred on the server side:', status, message, error, event);

	if (error instanceof Error) {
		console.error(error);
	}

	return {
		message: 'Whoops!',
	};
}

/** @type {PerformanceObserverCallback} */
function observerCallback(entries) {
	const entriesArr = [...entries.getEntries()];
	for (let i = entriesArr.length; i--; ) {
		const entry = entriesArr[i];
		if (entry.entryType === 'measure') {
			console.info(
				`${colors.fgGreen}${entry.name}${colors.reset} ${colors.fgYellow}${entry.duration
					.toFixed(3)
					.padStart(7, '0')}${colors.reset}ms`,
			);
		}
	}
}

if (dev) {
	if (globalThis.performanceObserver) globalThis.performanceObserver.disconnect();
	globalThis.performanceObserver = new PerformanceObserver(observerCallback);
	globalThis.performanceObserver.observe({ entryTypes: ['measure'] });
}
