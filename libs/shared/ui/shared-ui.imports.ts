/**
 * Barrel Export for Shared UI Components, Directives, and Pipes
 *
 * This file consolidates standalone components, directives, and pipes
 * from the Shared UI library to reduce import duplication.
 *
 * Usage:
 * import { SHARED_COMPONENTS, SHARED_PIPES, UserAvatarComponent } from '@shared/ui/shared-ui.imports';
 *
 * @Component({
 *   imports: [...SHARED_COMPONENTS, ...SHARED_PIPES]
 *   // or
 *   imports: [UserAvatarComponent, DateAgoPipe]
 * })
 */

import { UserAvatarComponent } from './components/user-avatar/user-avatar.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { HighlightDirective } from './directives/highlight.directive';
import { DateAgoPipe } from './pipes/date-ago.pipe';

// Re-export individual items for direct imports
export { UserAvatarComponent, DataTableComponent, HighlightDirective, DateAgoPipe };

/**
 * Shared UI Components
 * Reusable presentational components for user interfaces
 */
export const SHARED_COMPONENTS = [
  UserAvatarComponent,
  DataTableComponent
] as const;

/**
 * Shared UI Directives
 * Reusable directives for DOM manipulation and interaction
 */
export const SHARED_DIRECTIVES = [
  HighlightDirective
] as const;

/**
 * Shared UI Pipes
 * Reusable pipes for data transformation in templates
 */
export const SHARED_PIPES = [
  DateAgoPipe
] as const;

/**
 * All shared UI elements combined
 * Use when a component needs most/all shared UI features
 */
export const ALL_SHARED_UI = [
  ...SHARED_COMPONENTS,
  ...SHARED_DIRECTIVES,
  ...SHARED_PIPES
] as const;