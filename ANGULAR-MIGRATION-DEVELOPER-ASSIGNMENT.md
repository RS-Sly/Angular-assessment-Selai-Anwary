# Angular Standalone Migration - Developer Assessment

## Position: Angular Migration Specialist

### Overview
This technical assessment evaluates your ability to manually migrate Angular components from traditional NgModule-based architecture to standalone components. You will demonstrate understanding of complex dependency chains, service injection patterns, and cross-library dependencies in an NX monorepo environment.

**Duration:** 3-4 hours
**Environment:** Your local development setup
**Tools Allowed:** Angular CLI, IDE of choice, Angular documentation

## Assessment Structure

### Part 1: Knowledge Assessment (30 minutes)

Answer the following questions in a markdown file called `PART1-ANSWERS.md`:

1. **Conceptual Understanding**
   - Explain the key differences between NgModule-based components and standalone components
   - What are the benefits and potential challenges of migrating to standalone components?
   - How do you handle circular dependencies during migration?

2. **Technical Scenarios**
   - How would you migrate a component that uses content projection (`<ng-content>`)?
   - Describe the process for migrating a component with Angular Material dependencies
   - How do you preserve service injection when converting to standalone?

3. **Strategy Planning**
   - Given an NX monorepo with 50+ components across 5 libraries, outline your migration strategy
   - Which components would you migrate first and why?
   - How would you ensure the application remains functional during incremental migration?

### Part 2: Practical Migration Exercise (2.5 hours)

#### Setup
Install the provided test repository:

```bash
npm install
npm run test # Ensure all tests pass before starting
```

#### Task 1: Simple Component Migration (30 minutes)

**File:** `libs/shared/ui/components/user-avatar/user-avatar.component.ts`

```typescript
// BEFORE: Your starting point
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-avatar',
  template: `
    <div class="avatar" [class.avatar-large]="size === 'large'">
      <img [src]="imageUrl" [alt]="name" *ngIf="imageUrl">
      <span class="avatar-initials" *ngIf="!imageUrl">
        {{ getInitials(name) }}
      </span>
      <span class="status-indicator" [class.online]="isOnline"></span>
    </div>
  `,
  styleUrls: ['./user-avatar.component.scss']
})
export class UserAvatarComponent {
  @Input() name: string = '';
  @Input() imageUrl?: string;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() isOnline: boolean = false;

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }
}
```

**Requirements:**
- Convert to standalone component
- Identify and add all required imports
- Ensure the component remains functional
- Update any files that import this component

#### Task 2: Complex Component with Services (45 minutes)

**File:** `libs/features/products/product-list/product-list.component.ts`

```typescript
// BEFORE: Component with multiple service dependencies
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  products$ = this.productService.products$;
  searchControl = new FormControl('');
  private destroy$ = new Subject<void>();

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        takeUntil(this.destroy$)
      )
      .subscribe(term => this.productService.search(term));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addToCart(product: Product): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    this.cartService.addItem(product).subscribe({
      next: () => this.snackBar.open('Added to cart', 'Close', { duration: 2000 }),
      error: (err) => this.snackBar.open('Error adding to cart', 'Close')
    });
  }

  openProductDetail(product: Product): void {
    this.dialog.open(ProductDetailDialogComponent, {
      data: product,
      width: '600px'
    });
  }
}
```

**Requirements:**
- Convert to standalone with all Angular Material imports
- Preserve all service injections
- Maintain RxJS subscription management
- Handle the dialog component reference
- Ensure template bindings remain functional

#### Task 3: Shared Module Migration (45 minutes)

**File:** `libs/shared/ui/shared-ui.module.ts`

```typescript
// BEFORE: Shared module with multiple exports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

// Components
import { DataTableComponent } from './components/data-table/data-table.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { CardComponent } from './components/card/card.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

// Directives
import { HighlightDirective } from './directives/highlight.directive';
import { InfiniteScrollDirective } from './directives/infinite-scroll.directive';

// Pipes
import { CurrencyFormatterPipe } from './pipes/currency-formatter.pipe';
import { DateAgoPipe } from './pipes/date-ago.pipe';

@NgModule({
  declarations: [
    DataTableComponent,
    SearchBoxComponent,
    CardComponent,
    LoadingSpinnerComponent,
    HighlightDirective,
    InfiniteScrollDirective,
    CurrencyFormatterPipe,
    DateAgoPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule
  ],
  exports: [
    // Re-export Angular modules
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    // Export components
    DataTableComponent,
    SearchBoxComponent,
    CardComponent,
    LoadingSpinnerComponent,
    // Export directives
    HighlightDirective,
    InfiniteScrollDirective,
    // Export pipes
    CurrencyFormatterPipe,
    DateAgoPipe
  ]
})
export class SharedUiModule { }
```

**Requirements:**
- Convert all components to standalone
- Convert directives and pipes to standalone
- Create a barrel export for easy importing
- Update at least 2 consuming components to use the new imports
- Document the migration pattern for other developers

#### Task 4: Complex Feature with Routing (30 minutes)

**File:** `libs/features/admin/admin.module.ts`

```typescript
// BEFORE: Feature module with child routes
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';

@NgModule({
  imports: [
    SharedUiModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminDashboardComponent,
        canActivate: [AdminGuard],
        children: [
          {
            path: 'users',
            loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
          },
          {
            path: 'settings',
            loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)
          }
        ]
      }
    ])
  ],
  declarations: [
    AdminDashboardComponent,
    AdminSidebarComponent,
    AdminHeaderComponent
  ],
  providers: [AdminGuard]
})
export class AdminModule { }
```

**Requirements:**
- Convert to standalone components with routing
- Update lazy loading to use loadComponent
- Convert the guard to a functional guard
- Maintain route protection
- Preserve child route functionality

### Part 3: Migration Documentation (30 minutes)

Create a file `MIGRATION-GUIDE.md` documenting:

1. **Migration Checklist**
   - Step-by-step process you followed
   - Common patterns you identified
   - Potential pitfalls and how to avoid them

2. **Dependency Resolution Strategy**
   - How you identified required imports
   - Pattern for handling Material imports
   - Approach for shared dependencies

3. **Testing Strategy**
   - How to verify components work after migration
   - Test file updates required
   - E2E testing considerations

4. **Rollback Plan**
   - How to safely revert if issues arise
   - Feature flag strategy for gradual migration

## Evaluation Criteria

### Technical Proficiency (40%)
- Correct implementation of standalone components
- Proper dependency resolution
- Service injection preservation
- Template and styling maintained

### Problem-Solving (25%)
- Handling complex scenarios
- Circular dependency resolution
- Creative solutions to challenges

### Code Quality (20%)
- Clean, readable code
- Consistent patterns
- Proper TypeScript usage
- Following Angular best practices

### Documentation (15%)
- Clear migration guide
- Comprehensive answers to knowledge questions
- Well-documented code changes

## Submission Requirements

1. **Code Changes**
   - All migrated components must compile without errors
   - Existing tests must pass
   - Application must run successfully

2. **Documentation**
   - `PART1-ANSWERS.md` with knowledge assessment
   - `MIGRATION-GUIDE.md` with your approach
   - Code comments explaining complex changes

3. **Commit History**
   - Logical, atomic commits
   - Clear commit messages
   - One commit per task minimum

## Bonus Points

- Add unit tests for migrated components
- Implement performance improvements
- Create a migration script or tool
- Identify and fix existing bugs
- Suggest architectural improvements

## Resources Allowed

- Angular Official Documentation
- Angular Material Documentation
- Stack Overflow (cite sources)
- TypeScript Documentation
- Your own notes and previous code

## Submission

1. Push your branch to a public repository
2. Create a pull request with:
   - Summary of changes
   - Challenges faced and solutions
   - Time spent on each section
3. Email us when complete

## Example Solution Structure

For reference, a successfully migrated component should look like:

```typescript
// AFTER: Standalone component
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent {
  // Component logic remains the same
}
```

## Questions?

If you encounter blocking issues:
1. Document the issue in `BLOCKERS.md`
2. Describe what you tried
3. Move on to the next task
4. We'll discuss during review

---

**Good luck! We're looking for developers who can:**
- Understand complex Angular architectures
- Perform systematic migrations
- Maintain code quality under pressure
- Document their thought process
- Deliver working solutions

This assessment reflects real challenges you'll face in our migration project.