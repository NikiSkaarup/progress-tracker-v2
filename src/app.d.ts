import type { Database } from 'bun:sqlite';
import type { BunSQLiteDatabase } from 'drizzle-orm/bun-sqlite';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

declare global {
	declare namespace App {
		interface Locals {
			requestId: string;
		}
		// interface PageState {}
		// interface PageData {}
		// interface Error {}
		// interface Platform {}
	}

	var db: Database;
	var drizzleDB: BunSQLiteDatabase;
	var performanceObserver: PerformanceObserver;
	var wrappedTimers: Map<string, import('../wrapped-timer').WrappedTimer>;
}
