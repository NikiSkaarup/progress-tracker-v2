type ClassName = string | undefined | null;

type ClassProp = {
	class?: ClassName;
};

type Children = import('svelte').Snippet;

type ChildrenProp = {
	children?: Children;
};

type Enchancement = import('@sveltejs/kit').SubmitFunction<
	Record<string, unknown> | undefined, // Success
	Record<string, unknown> | undefined // Failure
>;
