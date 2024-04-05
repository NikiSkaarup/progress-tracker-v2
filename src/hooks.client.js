/** @type {import('@sveltejs/kit').HandleClientError} */
async function errorHandler({ error, event, status, message }) {
	console.error('An error occurred on the client side:', status, message, error, event);

	if (error instanceof Error) {
		console.error(error);
	}

	return {
		message: 'Whoops!',
	};
}

export const handleError = errorHandler;
