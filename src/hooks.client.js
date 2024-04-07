export async function handleError({ error, event, status, message }) {
	console.error('An error occurred on the client side:', status, message, error, event);

	if (error instanceof Error) {
		console.error(error);
	}

	return {
		message: 'Whoops!',
	};
}
