type ClassName = string | undefined | null;

type ClassProp = {
	class?: ClassName;
};

type Children = import('svelte').Snippet;

type ChildrenProp = {
	children?: Children;
};
