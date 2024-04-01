import { toast } from 'svelte-sonner';

/** @param {string} message */
export default function tempToast(message) {
	return () => {
		toast.warning(message);
	};
}
