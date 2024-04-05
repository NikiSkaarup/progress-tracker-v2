let isOpen = $state(false);

function open() {
	isOpen = true;
}

function close() {
	isOpen = false;
}

export default function getBookmarkCreate() {
	return {
		get isOpen() {
			return isOpen;
		},
		open,
		close,
	};
}
