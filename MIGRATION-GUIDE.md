# Angular Standalone Component Migration Guide

This guide documents the migration process from NgModules to standalone components, covering the approach, strategies, testing, and rollback procedures used in this project.

---

## 1. Migration Checklist

### Step-by-Step Process

The migration followed an incremental approach, completing one task at a time:

#### Task 1: Simple Component (UserAvatarComponent)
1. Added `standalone: true` to `@Component` decorator
2. Added `imports: [CommonModule]` for `*ngIf` directive
3. Verified build with `npm run build`
4. Updated consuming components to import directly
5. Removed from `SharedUiModule` declarations

#### Task 2: Complex Component with Services (ProductListComponent)
1. Analyzed dependencies:
   - Service: `ProductService` (already uses `providedIn: 'root'`)
   - Template directives: `*ngFor`, `*ngIf`, `async` pipe
   - Child components: `UserAvatarComponent`, `DataTableComponent`
2. Added `standalone: true`
3. Added all dependencies to imports array
4. Tested data flow and child component rendering

#### Task 3: Shared Module Migration (SharedUiModule)
1. Converted all declarations to standalone:
   - `DataTableComponent`, `UserAvatarComponent`
   - `HighlightDirective`, `DateAgoPipe`
2. Created missing style file: `data-table.component.scss`
3. Fixed template issue: Changed `[colspan]` to `[attr.colspan]`
4. Created barrel export file: `shared-ui.imports.ts`
5. Updated all consumers
6. Deleted `shared-ui.module.ts`

#### Task 4: Complex Feature with Routing (AdminModule)
1. Converted all components to standalone (Dashboard, Sidebar, Header, Settings)
2. Converted guards to functional pattern:
   ```typescript
   export const adminGuard: CanActivateFn = (route, state) => {
     const authService = inject(AuthService);
     return authService.isAdmin();
   };
   ```
3. Created `admin.routes.ts` with `loadComponent` for lazy loading
4. Updated app routes to use `loadChildren` with routes array
5. Verified two-level lazy loading (routes file + components)
6. Deleted `admin.module.ts`

### Common Patterns Identified

1. **CommonModule is essential** - Required for `*ngIf`, `*ngFor`, `async` pipe, etc.
2. **Services with `providedIn: 'root'` need no changes**
3. **Template dependencies must be explicit** - Every component, directive, pipe used in template must be imported
4. **Attribute vs Property binding** - HTML attributes (colspan, aria-*) require `[attr.xxx]` prefix
5. **Style files must exist** - Standalone enforces stricter file checking
6. **Routing patterns**:
   - Use `loadChildren` for Routes arrays
   - Use `loadComponent` for Component classes
   - Convert class-based guards to functional guards

### Common Pitfalls and Solutions

| Pitfall | Symptom | Solution |
|---------|---------|----------|
| Missing CommonModule | "Can't bind to 'ngIf'" | Add `CommonModule` to imports |
| Missing style file | "Can't resolve .scss" | Create file or use inline `styles: []` |
| Wrong binding syntax | "Can't bind to 'colspan'" | Use `[attr.colspan]` for HTML attributes |
| Circular dependencies | Build warnings | Extract shared interfaces, restructure imports |
| Guard migration | Routes not protected | Use `CanActivateFn` and `inject()` function |
| Lazy loading confusion | Type errors | `loadChildren` for Routes, `loadComponent` for Components |

---

## 2. Dependency Resolution Strategy

### Identifying Required Imports

**Template Analysis:**
- `*ngIf`, `*ngFor`, `*ngSwitch` → `CommonModule`
- `| async`, `| date` → `CommonModule`
- Custom pipes → Import specific pipe
- `<app-custom>` selectors → Import component
- Attribute directives → Import directive
- `[(ngModel)]` → `FormsModule`
- `[formControl]` → `ReactiveFormsModule`

**Service Analysis:**
- Check constructor dependencies
- Services with `providedIn: 'root'` → No import needed
- Services without → Add to `providers: []`

**Build Feedback:**
```bash
npm run build
# Angular provides clear error messages:
# "Can't bind to 'ngFor'" → Add CommonModule
# "'app-avatar' is not known" → Import component
# "No pipe found 'dateAgo'" → Import pipe
```

### Handling Material Imports

```typescript
// Import specific modules
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule]
})
```

**Rule:** Each Material component has its own module (e.g., `<mat-button>` → `MatButtonModule`)

### Shared Dependencies Pattern

**Before (NgModule):**
```typescript
// shared-ui.module.ts
@NgModule({
  declarations: [UserAvatarComponent, DataTableComponent],
  exports: [UserAvatarComponent, DataTableComponent]
})
export class SharedUiModule { }
```

**After (Barrel Exports):**
```typescript
// shared-ui.imports.ts
export { UserAvatarComponent } from './components/user-avatar/user-avatar.component';
export { DataTableComponent } from './components/data-table/data-table.component';

export const ALL_SHARED_UI = [
  UserAvatarComponent,
  DataTableComponent,
  HighlightDirective,
  DateAgoPipe
] as const;

// Usage
import { UserAvatarComponent } from '@shared/ui/shared-ui.imports';
// Or
import { ALL_SHARED_UI } from '@shared/ui/shared-ui.imports';
@Component({
  imports: [...ALL_SHARED_UI]
})
```

**Benefits:** Explicit dependencies, better tree-shaking, clearer imports

---

## 3. Testing Strategy

### Build Verification

```bash
# Clean build
rm -rf dist/ .angular/
npm run build
```

**Check for:**
- ✅ Build succeeds without errors
- ✅ Lazy chunks generated for lazy-loaded components
- ✅ No circular dependency warnings
- ✅ Reasonable bundle sizes

### Runtime Verification

```bash
npm start
# Navigate to http://localhost:4200
```

**Manual testing checklist:**
- [ ] Home page loads without errors
- [ ] Navigate to all routes
- [ ] Check Network tab for lazy chunk loading
- [ ] Components render correctly
- [ ] Services load data properly
- [ ] Pipes transform data correctly
- [ ] Directives apply behavior
- [ ] Guards protect routes appropriately
- [ ] No console errors

### Feature-Specific Testing

**Task 1 - UserAvatarComponent:**
- Displays with valid image
- Shows initials fallback when no image
- Size variations work

**Task 2 - ProductListComponent:**
- Products load from service
- List renders with data
- Child components display correctly

**Task 3 - Shared UI:**
- DataTable renders properly
- DateAgoPipe formats correctly
- HighlightDirective applies styles

**Task 4 - Admin Feature:**
- Admin routes lazy load (check Network tab)
- Guards protect routes
- Child routes work
- Navigation functions correctly

### Unit Test Updates

**Before (NgModule):**
```typescript
TestBed.configureTestingModule({
  declarations: [MyComponent],
  imports: [SharedUiModule]
});
```

**After (Standalone):**
```typescript
TestBed.configureTestingModule({
  imports: [
    MyComponent,  // Component goes in imports now
    UserAvatarComponent,
    DataTableComponent
  ]
});
```

**Guard Tests:**
```typescript
// Functional guard testing
const result = TestBed.runInInjectionContext(() =>
  adminGuard(route, state)
);
expect(result).toBe(true);
```

### E2E Testing

**No changes needed** - E2E tests are unaffected by architecture changes.

**Performance checks:**
- Verify bundle size decreased
- Check lazy loading in Network tab
- Run Lighthouse audit for performance metrics

---

## 4. Rollback Plan

### Rollback Strategies

#### Strategy 1: Emergency Git Revert
**When:** Critical production issue

```bash
# Revert last commit
git revert HEAD
git push origin migration-fixes

# Or reset (destructive)
git reset --hard <commit-before-migration>
git push --force origin migration-fixes
```

**Timeline:** 5-10 minutes

#### Strategy 2: Selective Rollback
**When:** Only one feature is broken

```bash
# Restore specific files
git log --oneline
git checkout <commit-hash> -- libs/features/admin/admin.module.ts
git checkout <commit-hash> -- libs/features/admin/**/*.ts

# Delete new files
rm libs/features/admin/admin.routes.ts

# Commit rollback
git add .
git commit -m "rollback: Revert Task 4 due to [issue]"
git push origin migration-fixes
```

**Timeline:** 15-30 minutes

#### Strategy 3: Feature Flag Toggle (Recommended)
**When:** Need quick toggle without deployment

**Setup:**
```typescript
// feature-flags.service.ts
@Injectable({ providedIn: 'root' })
export class FeatureFlagsService {
  private flags = {
    useStandaloneAdmin: environment.featureFlags?.admin ?? false
  };

  isEnabled(flag: keyof typeof this.flags): boolean {
    return this.flags[flag];
  }
}

// app.routes.ts
{
  path: 'admin',
  loadChildren: () => {
    const flags = inject(FeatureFlagsService);
    if (flags.isEnabled('useStandaloneAdmin')) {
      return import('./admin/admin.routes').then(m => m.ADMIN_ROUTES);
    } else {
      return import('./admin/admin.module').then(m => m.AdminModule);
    }
  }
}

// environment.prod.ts
export const environment = {
  featureFlags: { admin: false }  // Toggle here!
};
```

**Timeline:** Instant (change flag and redeploy)

### Gradual Rollout Strategy

**Phase 1:** Enable for 10% of users (Week 1)
**Phase 2:** Monitor metrics, increase to 50% (Week 2)
**Phase 3:** Increase to 100% if stable (Week 3)
**Phase 4:** Remove old code and feature flags (Week 4)

### Rollback Decision Matrix

| Severity | User Impact | Action | Timeline |
|----------|-------------|--------|----------|
| Critical | All users | Emergency git revert | Immediate |
| High | One feature broken | Selective rollback | < 1 hour |
| Medium | Some users | Feature flag disable | < 4 hours |
| Low | Edge case | Fix forward | Next sprint |

### Post-Rollback Actions

1. **Document the issue** - What broke, why, and impact
2. **Root cause analysis** - Why did migration cause this?
3. **Create action plan** - What needs fixing before retry?
4. **Improve process** - Update guide, add tests, enhance CI/CD

---

## Conclusion

This migration successfully converted the application from NgModules to standalone components using an incremental, risk-managed approach. Key achievements:

- ✅ All four tasks completed (simple component → complex routing)
- ✅ Improved code organization with explicit dependencies
- ✅ Enhanced lazy loading with two-level code splitting
- ✅ Modernized patterns (functional guards, barrel exports)

**Best practices:**
1. Start small and iterate
2. Test after every change
3. Use build errors to guide dependency resolution
4. Document issues and solutions
5. Always have a rollback plan

**Migration completed:** November 21, 2025
**Branch:** `migration-fixes`
**Build status:** ✅ Passing

---

## Resources

- [Angular Standalone Migration Guide](https://angular.dev/guide/components/importing)
- [Functional Guards Documentation](https://angular.dev/guide/routing/common-router-tasks#preventing-unauthorized-access)
- [Lazy Loading Guide](https://angular.dev/guide/routing/common-router-tasks#lazy-loading)