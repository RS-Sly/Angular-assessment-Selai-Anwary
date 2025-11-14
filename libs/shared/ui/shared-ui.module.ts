import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Angular Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

// Components
import { DataTableComponent } from './components/data-table/data-table.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { CardComponent } from './components/card/card.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { UserAvatarComponent } from './components/user-avatar/user-avatar.component';
import { ModalComponent } from './components/modal/modal.component';
import { NotificationComponent } from './components/notification/notification.component';
import { BadgeComponent } from './components/badge/badge.component';

// Directives
import { HighlightDirective } from './directives/highlight.directive';
import { InfiniteScrollDirective } from './directives/infinite-scroll.directive';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { DebounceClickDirective } from './directives/debounce-click.directive';

// Pipes
import { CurrencyFormatterPipe } from './pipes/currency-formatter.pipe';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';
import { FilterPipe } from './pipes/filter.pipe';

/**
 * Task 3: Shared Module Migration
 *
 * TODO: Migrate this module by:
 * 1. Convert all components to standalone
 * 2. Convert all directives to standalone
 * 3. Convert all pipes to standalone
 * 4. Create a barrel export file (public-api.ts or index.ts)
 * 5. Update at least 2 consuming components to use direct imports
 *
 * STRATEGY HINTS:
 * - Each component needs standalone: true and its own imports
 * - Create an export like: export const SHARED_UI_COMPONENTS = [...] as const
 * - Document your pattern for other developers
 *
 * NOTE: This module is imported by many features throughout the app
 */
@NgModule({
  declarations: [
    // Components
    DataTableComponent,
    SearchBoxComponent,
    CardComponent,
    LoadingSpinnerComponent,
    UserAvatarComponent,
    ModalComponent,
    NotificationComponent,
    BadgeComponent,

    // Directives
    HighlightDirective,
    InfiniteScrollDirective,
    ClickOutsideDirective,
    DebounceClickDirective,

    // Pipes
    CurrencyFormatterPipe,
    DateAgoPipe,
    TruncatePipe,
    FilterPipe
  ],
  imports: [
    // Angular Core
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    // Angular Material
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatBadgeModule,
    MatChipsModule,
    MatPaginatorModule,
    MatSortModule
  ],
  exports: [
    // Re-export Angular modules for convenience
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    // Export all components
    DataTableComponent,
    SearchBoxComponent,
    CardComponent,
    LoadingSpinnerComponent,
    UserAvatarComponent,
    ModalComponent,
    NotificationComponent,
    BadgeComponent,

    // Export all directives
    HighlightDirective,
    InfiniteScrollDirective,
    ClickOutsideDirective,
    DebounceClickDirective,

    // Export all pipes
    CurrencyFormatterPipe,
    DateAgoPipe,
    TruncatePipe,
    FilterPipe,

    // Export commonly used Material modules
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ]
})
export class SharedUiModule { }