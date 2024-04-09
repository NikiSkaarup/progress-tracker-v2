<script>
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Input } from '$lib/components/ui/input';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import * as Table from '$lib/components/ui/table';
	import { Toggle } from '$lib/components/ui/toggle';
	import { yyyyMMddhhmm } from '$lib/date-formatter';
	import { cn } from '$lib/utils';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import ChevronUpDown from 'lucide-svelte/icons/chevrons-up-down';
	import RefreshCW from 'lucide-svelte/icons/refresh-cw';
	import { Render, Subscribe, createRender, createTable } from 'svelte-headless-table';
	import {
		addHiddenColumns,
		addPagination,
		// addSelectedRows,
		addSortBy,
		addTableFilter
	} from 'svelte-headless-table/plugins';
	import Actions from './data-table-actions.svelte';
	import Name from './data-table-name.svelte';

	/** @typedef {import('$lib/server/db/schema.js').SelectBookmarkWithTags} SelectBookmarkWithTags */

	/** @type {import('svelte/store').Writable<Array<SelectBookmarkWithTags>>} */
	export let data;

	const table = createTable(data, {
		sort: addSortBy({
			disableMultiSort: true,
			initialSortKeys: [{ id: 'updatedAt', order: 'desc' }]
		}),
		page: addPagination({
			initialPageIndex: 0,
			initialPageSize: 15
		}),
		filter: addTableFilter({
			initialFilterValue: $page.url.searchParams.get('q') ?? '',
			fn: ({ filterValue, value }) => value.includes(filterValue.toLowerCase())
		}),
		// select: addSelectedRows(),
		hide: addHiddenColumns()
	});

	const columns = table.createColumns([
		table.column({
			header: 'Id',
			accessor: 'id',
			plugins: { sort: { disable: true }, filter: { exclude: true } }
		}),
		table.column({
			id: 'name',
			header: 'Name',
			accessor: ({ name, href }) => ({ name, href }),
			cell: (item) => createRender(Name, item.value),
			plugins: {
				filter: {
					getFilterValue(value) {
						return value.name.toLowerCase();
					}
				}
			}
		}),
		table.column({
			header: 'Finished',
			accessor: 'finished',
			cell: (item) => (item.value === null ? 'Yes' : 'No'),
			plugins: { sort: { disable: true }, filter: { exclude: true } }
		}),
		table.column({
			header: 'Created',
			accessor: 'createdAt',
			cell: (item) => yyyyMMddhhmm.format(Date.parse(item.value.toString())),
			plugins: { sort: { disable: true }, filter: { exclude: true } }
		}),
		table.column({
			header: 'Updated',
			accessor: 'updatedAt',
			cell: (item) => yyyyMMddhhmm.format(Date.parse(item.value.toString())),
			plugins: { filter: { exclude: true } }
		}),
		table.column({
			header: '',
			accessor: ({ id, href, finished }) => ({ id, href, finished }),
			cell: (item) => createRender(Actions, item.value),
			plugins: {
				sort: {
					disable: true
				}
			}
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, flatColumns, pluginStates, rows } =
		table.createViewModel(columns);

	const { sortKeys } = pluginStates.sort;

	const { hiddenColumnIds } = pluginStates.hide;
	const ids = flatColumns.map((c) => c.id);

	const initialHiddenColumnIds = ['id', 'finished', 'createdAt'];

	let hideForId = Object.fromEntries(ids.map((id) => [id, !initialHiddenColumnIds.includes(id)]));

	$: $hiddenColumnIds = Object.entries(hideForId)
		.filter(([, hide]) => !hide)
		.map(([id]) => id);

	const { hasNextPage, hasPreviousPage, pageIndex, pageCount } = pluginStates.page;
	const { filterValue } = pluginStates.filter;
	// const { selectedDataIds } = pluginStates.select;

	const hideableCols = ['id', 'finished', 'createdAt', 'updatedAt'];

	/** @type {Timer} */
	let timer;

	let enableInterval = false;

	$: if (enableInterval) {
		timer = setInterval(invalidateAll, 5000);
	} else {
		clearInterval(timer);
	}
</script>

<div
	class="flex flex-col items-start gap-2 md:flex-row md:items-center md:justify-between md:gap-4"
>
	<Input
		class="max-w-sm"
		placeholder="Filter name..."
		type="text"
		bind:value={$filterValue}
		on:input={() => {
			const value = $filterValue.trim();
			window.history.replaceState(null, '', `?q=${encodeURIComponent(value)}`);
		}}
	/>
	<div class="flex items-center gap-2">
		<Toggle aria-label="Toggle auto refresh" variant="outline" bind:pressed={enableInterval}>
			<RefreshCW />
		</Toggle>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button variant="outline" builders={[builder]}>
					Columns <ChevronDown class="ml-2 h-4 w-4" />
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				{#each flatColumns as col}
					{#if hideableCols.includes(col.id)}
						<DropdownMenu.CheckboxItem bind:checked={hideForId[col.id]}>
							{col.header}
						</DropdownMenu.CheckboxItem>
					{/if}
				{/each}
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
</div>
<div class="rounded-md border">
	<ScrollArea orientation="horizontal">
		<Table.Root {...$tableAttrs}>
			<Table.Header>
				{#each $headerRows as headerRow}
					<Subscribe rowAttrs={headerRow.attrs()}>
						<Table.Row>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
									<Table.Head {...attrs}>
										{#if cell.id === 'name' || cell.id === 'updatedAt'}
											<Button variant="ghost" on:click={props.sort.toggle}>
												<Render of={cell.render()} />
												<ChevronUpDown
													class={cn(
														$sortKeys[0]?.id === cell.id && 'text-foreground',
														'ml-2 h-4 w-4'
													)}
												/>
											</Button>
										{:else}
											<Render of={cell.render()} />
										{/if}
									</Table.Head>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Header>
			<Table.Body {...$tableBodyAttrs}>
				{#each $pageRows as row (row.id)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
						<Table.Row {...rowAttrs}>
							<!-- data-state={$selectedDataIds[row.id] && 'selected'} -->
							{#each row.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<Table.Cell {...attrs}>
										{#if cell.id === 'id' || cell.id === 'createdAt' || cell.id === 'updatedAt'}
											<span class="inline-block text-nowrap font-mono">
												<Render of={cell.render()} />
											</span>
										{:else}
											<Render of={cell.render()} />
										{/if}
									</Table.Cell>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Body>
		</Table.Root>
	</ScrollArea>
</div>
<div class="flex items-center justify-end gap-1 space-x-2">
	<div class="text-muted-foreground flex-1 text-sm">
		viewing page {$pageIndex + 1} of {$pageCount}
	</div>
	<Button
		variant="outline"
		size="sm"
		on:click={() => ($pageIndex = $pageIndex - 1)}
		disabled={!$hasPreviousPage}
	>
		Previous
	</Button>
	<Button
		variant="outline"
		size="sm"
		disabled={!$hasNextPage}
		on:click={() => ($pageIndex = $pageIndex + 1)}
	>
		Next
	</Button>
</div>
