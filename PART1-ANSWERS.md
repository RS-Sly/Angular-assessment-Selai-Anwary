# Part 1: Knowledge Assessment - Answers

## 1. Conceptual Understanding

### Key differences between NgModule-based components and standalone components

**NgModule-based components:**
- Must be declared in an NgModule's `declarations` array
- Dependencies are provided through the module's `imports` array
- All components in the module share the same dependency pool
- Cannot be used independently without their containing module
- Requires more boilerplate and configuration

**Standalone components:**
- Include `standalone: true` in the `@Component` decorator
- Declare their own dependencies directly in the `imports` array
- Self-contained and can be used independently
- Don't need to be declared in any NgModule
- More explicit about dependencies (better tree-shaking)
- Simpler mental model - each component owns its dependencies

### Benefits and potential challenges of migrating to standalone components

**Benefits:**
1. **Simpler architecture** - No need to manage NgModules, reducing complexity
2. **Better tree-shaking** - Unused components are easier to identify and remove
3. **Improved developer experience** - Less boilerplate, clearer dependencies
4. **Easier lazy loading** - Can lazy load individual components without creating modules
5. **More explicit dependencies** - Each component declares what it needs
6. **Better for micro-frontends** - Components are more portable and reusable
7. **Future-proof** - Angular is moving towards standalone as the default

**Potential challenges:**
1. **Migration effort** - Existing large codebases require systematic migration
2. **Circular dependencies** - Can become more visible and need careful handling
3. **Shared dependencies** - Need to manage imports across many components (can use barrel exports)
4. **Team education** - Developers need to learn the new patterns
5. **Third-party libraries** - Some may not support standalone yet
6. **Testing updates** - Test configuration needs updates (TestBed setup)
7. **Breaking changes** - Must ensure backward compatibility during incremental migration

### How do you handle circular dependencies during migration?

**Strategies to handle circular dependencies:**

1. **Identify the cycle first:**
   - Use build error messages to locate circular imports
   - Map out component dependencies visually if needed

2. **Break the cycle by restructuring:**
   - Move shared logic to a separate service
   - Extract common functionality to a parent/base class
   - Use dependency injection instead of direct imports

3. **Use interfaces and tokens:**
   - Define interfaces in separate files
   - Use injection tokens for cross-cutting concerns
   - Leverage TypeScript's type system without importing implementations

4. **Lazy loading:**
   - Use dynamic imports (`import()`) for components
   - Defer loading of components that create cycles

5. **Barrel exports pattern:**
   - Create index files that re-export components
   - Import from the barrel instead of direct paths
   - Be careful not to create new cycles


**Example:**
```typescript
// Instead of direct circular imports:
// component-a.ts imports component-b.ts
// component-b.ts imports component-a.ts

// Solution: Extract to a shared service
// shared.service.ts
@Injectable({ providedIn: 'root' })
export class SharedService {
  // Common logic here
}

// Both components import the service instead of each other
```

## 2. Technical Scenarios

### How would you migrate a component that uses content projection (`<ng-content>`)?

Content projection components migrate smoothly to standalone because `<ng-content>` is a built-in Angular feature that doesn't require special imports.

**Migration steps:**

1. **Add `standalone: true` to the decorator:**
```typescript
@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <div class="card">
      <div class="card-header">
        <ng-content select="[card-header]"></ng-content>
      </div>
      <div class="card-body">
        <ng-content></ng-content>
      </div>
      <div class="card-footer">
        <ng-content select="[card-footer]"></ng-content>
      </div>
    </div>
  `
})
export class CardComponent { }
```

2. **Add necessary imports** (like `CommonModule` if using directives):
```typescript
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  // ...
})
```

3. **Update parent components** to import the standalone component:
```typescript
// Parent component using the card
@Component({
  standalone: true,
  imports: [CardComponent],
  template: `
    <app-card>
      <h2 card-header>Title</h2>
      <p>Content here</p>
      <button card-footer>Action</button>
    </app-card>
  `
})
```

**Key points:**
- `<ng-content>` works identically in standalone components
- Named slots (`select` attribute) continue to work
- No special handling required for content projection itself
- Parent components must import the standalone component

### Describe the process for migrating a component with Angular Material dependencies

Angular Material components are already standalone-ready since Angular Material v15+.

**Migration process:**

1. **Identify all Material modules used:**
```typescript
// BEFORE (NgModule-based)
@NgModule({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
```

2. **Add standalone flag and move Material imports to component:**
```typescript
// AFTER (Standalone)
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-data-display',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule
  ],
  // ...
})
```

3. **Handle Material services:**
   - MatDialog, MatSnackBar, MatBottomSheet are provided in root by default
   - Just inject them normally in the constructor
   - No special imports needed for services

4. **Import dialog components:**
```typescript
import { MatDialog } from '@angular/material/dialog';

// When opening dialogs
openDialog() {
  this.dialog.open(MyDialogComponent, {
    // MyDialogComponent must also be standalone
  });
}
```

5. **Test thoroughly:**
   - Verify Material styles are loading
   - Check that Material theme is applied
   - Test all Material component interactions

### How do you preserve service injection when converting to standalone?

Service injection works almost identically in standalone components. Here's how to preserve it:

**1. Root-provided services (most common):**
```typescript
// Service remains unchanged
@Injectable({ providedIn: 'root' })
export class DataService { }

// Standalone component - just inject normally
@Component({
  standalone: true,
  // ...
})
export class MyComponent {
  constructor(private dataService: DataService) { }
}
```

**2. Component-level providers:**
```typescript
// BEFORE (NgModule)
@NgModule({
  declarations: [MyComponent],
  providers: [LocalService]
})

// AFTER (Standalone)
@Component({
  standalone: true,
  providers: [LocalService], // Add providers here
  // ...
})
export class MyComponent {
  constructor(private localService: LocalService) { }
}
```

**3. Environment injectors (for lazy-loaded features):**
```typescript
// Use provideRouter or custom environment providers
export const routes: Routes = [
  {
    path: 'feature',
    loadComponent: () => import('./feature.component').then(m => m.FeatureComponent),
    providers: [FeatureService] // Provide services at route level
  }
];
```

**4. Import standalone services:**
```typescript
// If migrating a service that was provided in a module
@Injectable() // Remove providedIn
export class MyService { }

// In component
@Component({
  standalone: true,
  providers: [MyService], // Or add providedIn: 'root' to service
  // ...
})
```

**Key principles:**
- Services with `providedIn: 'root'` work without changes
- Component-level providers move to the component's `providers` array
- Feature-level services can be provided in routes
- Import the service class file but don't add to `imports` array (common mistake)

## 3. Strategy Planning

### Given an NX monorepo with 50+ components across 5 libraries, outline your migration strategy

**Migration Strategy for Large NX Monorepo:**

**Phase 1: Preparation (Week 1)**
1. **Audit the codebase:**
   - Generate dependency graph using NX tools
   - Identify all components, directives, pipes, and modules
   - Map inter-library dependencies
   - Document current module structure

2. **Setup and tooling:**
   - Ensure all libraries are on compatible Angular version (v15+)
   - Setup automated testing pipeline
   - Create feature flags for gradual rollout
   - Establish rollback procedures
   - **Leverage AI-assisted development tools:**
     - Use GitHub Copilot (or similar AI tools) for pattern recognition and repetitive tasks
     - Create migration recipes/prompts for consistent transformations
     - Document common patterns for AI to reference (TestBed configs, imports arrays)
     - Use AI for generating boilerplate and identifying similar components across codebase
     - Train team on effective AI prompting for migration tasks

3. **Team preparation:**
   - Conduct training sessions on standalone components
   - Create migration documentation and patterns
   - Setup code review process focused on migration

**Phase 2: Foundation Layer (Week 2-3)**
1. **Start with leaf nodes** (no dependencies):
   - Pipes first (simplest)
   - Directives
   - Presentational components
   - Utility components

2. **Create barrel exports:**
   - Setup index.ts files for easy imports
   - Group related standalone components

3. **Migrate shared services:**
   - Ensure all services use `providedIn: 'root'`
   - Remove module-level service providers

**Phase 3: Feature Libraries (Week 4-6)**
1. **Migrate one library at a time:**
   - Bottom-up approach (dependencies first)
   - Keep modules temporarily for backward compatibility
   - Update consumers incrementally

2. **Test each library independently:**
   - Run unit tests
   - Run integration tests
   - Verify lazy loading works

**Phase 4: Application Layer (Week 7-8)**
1. **Migrate app routing:**
   - Convert to standalone routing
   - Update lazy loading to use `loadComponent`
   - Convert route guards to functional guards

2. **Migrate app component:**
   - Convert root component last
   - Update main.ts to use bootstrapApplication
   - Remove root NgModule

**Phase 5: Cleanup (Week 9)**
1. **Remove old modules:**
   - Delete NgModule files
   - Remove unnecessary barrel exports
   - Clean up unused imports

2. **Optimize bundle:**
   - Analyze bundle size improvements
   - Remove duplicate imports
   - Verify tree-shaking is effective

### Which components would you migrate first and why?

**Priority Order:**

**1. Pipes (Migrate First)**
- Simplest to migrate (usually no dependencies)
- Low risk
- Quick wins to build confidence
- Example: `DateAgoPipe`, `CurrencyFormatterPipe`

**2. Standalone Directives**
- Usually have minimal dependencies
- Often imported by many components
- Get them done early to unblock others
- Example: `HighlightDirective`, `TooltipDirective`

**3. Leaf Components (No children)**
- Pure presentational components
- Limited dependencies
- Easy to test in isolation
- Example: `LoadingSpinnerComponent`, `UserAvatarComponent`, `IconComponent`

**4. Shared UI Components**
- Used across multiple features
- Migrating early unblocks many other components
- Creates reusable patterns for the team
- Example: `ButtonComponent`, `CardComponent`, `ModalComponent`

**5. Feature Components (Bottom-up)**
- Start with child components, move up to parents
- Ensures dependencies are ready
- Example: `ProductCardComponent` before `ProductListComponent`

**6. Smart Components / Containers**
- Have multiple dependencies on other components
- Require services to be properly configured
- Example: `DashboardComponent`, `ProductListComponent`

**7. Routed Components**
- Depend on routing configuration
- Migrate after children are done
- Update lazy loading strategy
- Example: `AdminDashboardComponent`

**8. Root Component (Migrate Last)**
- Most dependencies on other components
- Requires bootstrapApplication setup
- Highest risk if done too early
- Example: `AppComponent`

**Why this order:**
It is what I've done before for HeadFirst, it:
- Minimizes risk by starting simple
- Allows testing at each step
- Builds team confidence and expertise
- Prevents blocking issues
- Enables incremental deployment

### How would you ensure the application remains functional during incremental migration?

**Strategies for Zero-Downtime Migration:**

**1. Maintain Backward Compatibility:**
```typescript
// Keep module exports during migration
@NgModule({
  imports: [StandaloneComponent], // Import standalone into module
  exports: [StandaloneComponent]  // Re-export for old consumers
})
export class LegacyModule { }
```

**2. Feature Flags:**
```typescript
// Environment-based feature flags
export const environment = {
  useStandaloneComponents: false
};

// In routing
const routes: Routes = [
  {
    path: 'products',
    loadComponent: environment.useStandaloneComponents
      ? () => import('./products.standalone').then(m => m.ProductsComponent)
      : undefined,
    loadChildren: !environment.useStandaloneComponents
      ? () => import('./products.module').then(m => m.ProductsModule)
      : undefined
  }
];
```

**3. Parallel Running:**
- Keep both NgModule and standalone versions temporarily
- Route traffic based on feature flags
- Compare behavior in staging environment

**4. Comprehensive Testing Strategy:**

**Unit Tests:**
```typescript
// Update TestBed for standalone
TestBed.configureTestingModule({
  imports: [StandaloneComponent] // Import, not declare
});
```

**Integration Tests:**
- Test component interactions
- Verify service injection works
- Check routing and lazy loading

**E2E Tests:**
- Run full user flows
- Verify UI functionality
- Check performance metrics

**5. Incremental Deployment:**
- Deploy one library at a time
- Monitor error rates and performance
- Have rollback plan ready

**6. Monitoring and Observability:**
```typescript
// Add logging for migration tracking
@Component({
  standalone: true,
  // ...
})
export class MyComponent {
  constructor() {
    console.log('Standalone component loaded:', this.constructor.name);
  }
}
```

**7. Documentation and Communication:**
- Document migration status of each component
- Keep team informed of progress
- Maintain migration runbook

**8. Rollback Procedures:**
- Keep Git history clean with atomic commits
- Tag stable versions
- Have revert scripts ready
- Test rollback in staging


---

**Time spent on Part 1:** ~60 minutes
