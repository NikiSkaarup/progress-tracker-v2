let isOpen = $state(false);

/** @type {PTBookmark | undefined} */
let bookmark = $state();

/** @param inputBookmark {PTBookmark | undefined} */
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
			return /** @type {PTBookmark} */ (bookmark);
		},
		open,
		close
	};
}
