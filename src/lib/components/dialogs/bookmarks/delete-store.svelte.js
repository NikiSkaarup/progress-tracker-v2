let isOpen = $state(false);

let _id = $state(-1);

/** @param {number} id */
function open(id) {
	if (id < 0) {
		console.error("Can't open delete bookmark dialog without a bookmark id");
		return;
	}
	isOpen = true;
	_id = id;
}

function close() {
	isOpen = false;
	_id = -1;
}

export default function getDeleteStore() {
	return {
		get isOpen() {
			return isOpen;
		},
		get id() {
			return _id;
		},
		open,
		close,
	};
}
