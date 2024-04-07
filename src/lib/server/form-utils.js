import { fail } from '@sveltejs/kit';

/**
 * @param {FormData} data
 * @param {string} key
 * @returns number | ReturnType<typeof fail>
 */
function getNumber(data, key) {
	const value = data.get(key);

	if (value === null) {
		return fail(401, { error: `No ${key} provided` });
	}

	const number = Number.parseInt(value.toString().trim());

	if (Number.isNaN(number)) {
		return fail(401, { error: `${key} is not a number` });
	}

	return number;
}

/**
 * @param {FormData} data
 * @param {string} key
 * @returns boolean | ReturnType<typeof fail>
 */
function getBoolean(data, key) {
	const value = data.get(key);
	if (value === null) {
		return fail(401, { error: `No ${key} provided` });
	}

	return value === 'true' || value === '1';
}

/**
 * @param {FormData} data
 * @param {string} key
 * @returns string | ReturnType<typeof fail>
 */
function getString(data, key) {
	const value = data.get(key);
	if (value === null) {
		return fail(401, { error: `No ${key} provided` });
	}

	return value.toString().trim();
}

export default {
	getBoolean,
	getNumber,
	getString,
};
