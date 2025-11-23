/**
 * Barrel Export for Shared Material and Angular Modules
 *
 * This file consolidates commonly used Material and Angular modules
 * across the products feature to reduce import duplication.
 *
 * Usage:
 * import { COMMON_IMPORTS, MATERIAL_FORM_IMPORTS, MATERIAL_TABLE_IMPORTS } from '../shared-material.imports';
 *
 * @Component({
 *   imports: [...COMMON_IMPORTS, ...MATERIAL_FORM_IMPORTS]
 * })
 */

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Material Modules - Core UI
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// Material Modules - Forms
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';

// Material Modules - Data Display
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/**
 * Common Angular modules used across most components
 */
export const COMMON_IMPORTS = [
  CommonModule,
  RouterModule
] as const;

/**
 * Form-related modules (Reactive and Template-driven)
 */
export const FORM_IMPORTS = [
  ReactiveFormsModule,
  FormsModule
] as const;

/**
 * Core Material UI modules (buttons, icons, cards, dialogs)
 */
export const MATERIAL_CORE_IMPORTS = [
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatDialogModule,
  MatSnackBarModule
] as const;

/**
 * Material form controls (inputs, selects, sliders)
 */
export const MATERIAL_FORM_IMPORTS = [
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatSliderModule
] as const;

/**
 * Material data display modules (tables, chips, tooltips)
 */
export const MATERIAL_DATA_IMPORTS = [
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatChipsModule,
  MatTooltipModule,
  MatProgressSpinnerModule
] as const;

/**
 * All Material modules combined (use when component needs most Material features)
 */
export const ALL_MATERIAL_IMPORTS = [
  ...MATERIAL_CORE_IMPORTS,
  ...MATERIAL_FORM_IMPORTS,
  ...MATERIAL_DATA_IMPORTS
] as const;

/**
 * Complete set of all imports (use sparingly, prefer specific imports)
 */
export const ALL_IMPORTS = [
  ...COMMON_IMPORTS,
  ...FORM_IMPORTS,
  ...ALL_MATERIAL_IMPORTS
] as const;