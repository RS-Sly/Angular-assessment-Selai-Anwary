# Angular Migration Assessment - Setup Instructions

## 🎯 Purpose

This repository contains the technical assessment for Angular developers applying for the Migration Specialist position. The assessment evaluates your ability to manually migrate Angular components from NgModule architecture to standalone components.

## 📋 Prerequisites

- Node.js 18+ and npm 9+
- Angular CLI (`npm install -g @angular/cli`)
- Git
- IDE with TypeScript support (VS Code or Intellj recommended)
- Chrome browser for testing

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Verify Setup

```bash
# Build the project to verify everything compiles
npm run build

# Start the development server
npm start
# Navigate to http://localhost:4200
# You should see the assessment home page with task list

# Optional: Run tests (may need configuration)
# npm test
```

**Expected Output:**
- Build completes successfully (you may see bundle size warnings - that's OK)
- Dev server starts at `http://localhost:4200`
- Home page displays with 4 migration tasks listed
- You can navigate to Products and Admin sections (currently using NgModules)

## 📁 Repository Structure

```
angular-migration-assessment/
├── src/                            # Main Angular application
│   ├── app/                        # App root
│   │   ├── app.component.ts        # Root component
│   │   ├── app.module.ts           # Root module (NgModule-based)
│   │   ├── app.routes.ts           # App routing
│   │   └── home/                   # Home page with task list
│   ├── main.ts                     # Bootstrap file
│   └── index.html                  # HTML entry point
│
├── libs/                           # Library code to migrate
│   ├── shared/ui/                  # Shared UI components library
│   │   ├── components/             # Components to migrate
│   │   │   ├── user-avatar/        # Task 1: Simple component
│   │   │   └── data-table/         # Task 3: Part of shared module
│   │   ├── directives/             # Directives to migrate
│   │   ├── pipes/                  # Pipes to migrate
│   │   └── shared-ui.module.ts     # Task 3: Module to decompose
│   │
│   ├── features/
│   │   ├── products/               # Product feature module
│   │   │   ├── product-list/       # Task 2: Complex component
│   │   │   ├── products.module.ts  # Products module
│   │   │   └── product-detail-dialog/  # Dialog component
│   │   │
│   │   └── admin/                  # Task 4: Admin feature
│   │       ├── admin.module.ts     # Module with routing & guards
│   │       ├── admin-dashboard/    # Dashboard component
│   │       ├── guards/             # Route guards to migrate
│   │       └── services/           # Admin services
│   │
│   └── data-access/
│       ├── services/               # Shared services (already root-provided)
│       │   ├── auth.service.ts
│       │   ├── product.service.ts
│       │   └── cart.service.ts
│       └── models/                 # TypeScript interfaces
│           └── product.model.ts
│
├── ANGULAR-MIGRATION-DEVELOPER-ASSIGNMENT.md  # Full assignment details
├── EVALUATION-RUBRIC-FOR-HIRING-TEAM.md      # Scoring guide
└── PART1-ANSWERS.md / PART2-PRACTICAL-SOLUTIONS.md  # Example answers
```

## 📝 Assessment Tasks

You will complete 4 main tasks:

1. **Simple Component Migration** (30 min)
   - Location: `libs/shared/ui/components/user-avatar/`
   - Basic standalone conversion

2. **Complex Component with Services** (45 min)
   - Location: `libs/features/products/product-list/`
   - Service injection and Material imports

3. **Shared Module Migration** (45 min)
   - Location: `libs/shared/ui/shared-ui.module.ts`
   - Decompose module into standalone components

4. **Feature with Routing** (30 min)
   - Location: `libs/features/admin/`
   - Routing and lazy loading migration

## 🧪 Testing Your Work

After each migration:

```bash
# Run unit tests
npm test

# Run specific test file
ng test --include='**/*user-avatar*'

# Build to check for compilation errors
npm run build

# Run the app to test functionality
npm start
```

## 📊 Evaluation Criteria

Your submission will be evaluated on:

- **Correctness** (40%): Components work after migration
- **Problem-Solving** (25%): How you handle complex scenarios
- **Code Quality** (20%): Clean, maintainable code
- **Documentation** (15%): Clear explanations and guides

## ⏱️ Time Management

**Total Time: 3-4 hours**

Suggested breakdown:
- Part 1 (Knowledge): 30 minutes
- Part 2 (Practical): 2.5 hours
- Part 3 (Documentation): 30 minutes

## 💡 Tips

1. **Start Simple**: Begin with Task 1 to understand the pattern
2. **Check Imports**: Use your IDE's auto-import carefully
3. **Test Often**: Run tests after each change
4. **Document Issues**: If blocked, document in `BLOCKERS.md`
5. **Commit Frequently**: Make atomic commits for each task

## 🚫 Not Allowed

- Using automated migration tools
- Modifying test files (unless fixing actual bugs)

## ✅ Submission Checklist

Before submitting:

- [ ] All 4 migration tasks attempted
- [ ] `PART1-ANSWERS.md` completed
- [ ] `MIGRATION-GUIDE.md` created
- [ ] All tests passing (`npm run test:all`)
- [ ] Application builds (`npm run build`)
- [ ] Application runs (`npm start`)
- [ ] Clean commit history
- [ ] Pull request created

## 📚 Helpful Resources

- [Angular Standalone Components Guide](https://angular.io/guide/standalone-components)
- [Angular Material with Standalone](https://material.angular.io/guide/getting-started)
- [RxJS Operators](https://rxjs.dev/guide/operators)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🆘 Getting Help

If you encounter blocking issues:

1. Document in `BLOCKERS.md`:
   ```markdown
   ## Task 2 - Service Injection Issue

   **Problem:**
   Cannot resolve ProductService dependency

   **What I Tried:**
   1. Added import statement
   2. Checked service provider location
   3. Verified service is marked as providedIn: 'root'

   **Time Spent:** 15 minutes
   ```

2. Move on to the next task
3. We'll discuss during the review

## 🎯 Success Criteria

A successful submission will:
- Have all components converted to standalone
- Maintain full application functionality
- Include comprehensive documentation
- Show understanding of migration patterns
- Demonstrate problem-solving skills

## 📧 Submission

When complete:

Email us the repo with your fixes or provide a github repo link.

---

**Good luck!** This assessment reflects real challenges you'll face in our production migration project. We're looking for thoughtful, systematic approaches more than perfect solutions.

## Questions?

For clarification on requirements only (not solutions), email: [mitchell.tieleman@rabobank.nl]