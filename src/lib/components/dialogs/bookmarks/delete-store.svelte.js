let isOpen = $state(false);

/** @typedef {import('$lib/server/db/schema.js').SelectBookmark} SelectBookmark */

/** @type {SelectBookmark | undefined} */
let bookmark = $state();

/** @param inputBookmark {SelectBookmark | undefined} */
function open(inputBookmark) {
	if (!inputBookmark) {
		console.error("Can't open delete bookmark dialog without a bookmark");
		return;
	}
	isOpen = true;
	bookmark = { ...inputBookmark };
}

function close() {
	isOpen = false;
	bookmark = undefined;
}

export default function getDeleteStore() {
	return {
		get isOpen() {
			return isOpen;
		},
		get bookmark() {
			return /** @type {SelectBookmark} */ (bookmark);
		},
		open,
		close,
	};
}
