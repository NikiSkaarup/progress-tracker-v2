/** @type {string | undefined} */
const locales = 'en-US';

export const yyyyMMdd = new Intl.DateTimeFormat(locales, {
	year: 'numeric',
	month: '2-digit',
	day: '2-digit',
	hourCycle: 'h23',
});

export const yyyyMMddhhmm = new Intl.DateTimeFormat(locales, {
	year: 'numeric',
	month: '2-digit',
	day: '2-digit',
	hour: '2-digit',
	minute: '2-digit',
	hourCycle: 'h23',
});
