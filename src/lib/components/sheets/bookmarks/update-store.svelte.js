let isOpen = $state(false);

/** @typedef {import('$lib/server/db/schema.js').SelectBookmark} SelectBookmark */

/** @type {SelectBookmark | undefined} */
let bookmark = $state();

/** @param inputBookmark {SelectBookmark | undefined} */
function open(inputBookmark) {
	if (!inputBookmark) {
		console.error("Can't open edit bookmark sheet without a bookmark");
		return;
	}
	isOpen = true;
	bookmark = { ...inputBookmark };
}

function close() {
	isOpen = false;
}

export default function getEditStore() {
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
