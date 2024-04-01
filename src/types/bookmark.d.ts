type PTBookmark = {
	id: number;
	title: string;
	href: string;
	finished: boolean;
	started: boolean;
	updated: boolean;
	tags: { name: string; variant: import('$lib/components/ui/badge/index.ts').Variant }[];
};
