let isOpen = $state(false);

/** @type {PTBookmark | undefined} */
let bookmark = $state();

/** @param inputBookmark {PTBookmark | undefined} */
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
			return /** @type {PTBookmark} */ (bookmark);
		},
		open,
		close,
	};
}
