import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { ProductService } from '@data-access/services/product.service';
import { CartService } from '@data-access/services/cart.service';
import { AuthService } from '@data-access/services/auth.service';
import { Product } from '@data-access/models/product.model';
import { ProductDetailDialogComponent } from '../product-detail-dialog/product-detail-dialog.component';
import { ALL_IMPORTS } from '../shared-material.imports';

/**
 * Task 2: Complex Component with Services
 *
 * COMPLETED: Converted to standalone component
 * ✓ Added standalone: true
 * ✓ Used barrel export pattern (ALL_IMPORTS from shared-material.imports.ts)
 * ✓ Preserved all service injections (services are providedIn: 'root')
 * ✓ Handled the dialog component reference (imported ProductDetailDialogComponent)
 * ✓ Maintained RxJS subscription management (destroy$ pattern unchanged)
 *
 * IMPORT STRATEGY:
 * - Uses barrel export (shared-material.imports.ts) to reduce duplication
 * - ALL_IMPORTS includes: COMMON_IMPORTS + FORM_IMPORTS + ALL_MATERIAL_IMPORTS
 * - ProductDetailDialogComponent imported directly (standalone component)
 *
 * BARREL EXPORT PROVIDES:
 * - COMMON_IMPORTS: CommonModule, RouterModule
 * - FORM_IMPORTS: ReactiveFormsModule, FormsModule
 * - MATERIAL_CORE_IMPORTS: Button, Icon, Card, Dialog, SnackBar
 * - MATERIAL_FORM_IMPORTS: FormField, Input, Select, Slider
 * - MATERIAL_DATA_IMPORTS: Table, Sort, Paginator, Chips, Tooltip, Spinner
 *
 * BENEFITS:
 * - Reduced import duplication across feature components
 * - Single source of truth for Material module imports
 * - Easier maintenance and updates
 */
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    ...ALL_IMPORTS,
    ProductDetailDialogComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  products$ = this.productService.products$;
  searchControl = new FormControl('');
  loading = false;
  selectedCategory = 'all';
  priceRange = { min: 0, max: 1000 };

  private destroy$ = new Subject<void>();

  categories = [
    { value: 'all', label: 'All Products' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'books', label: 'Books' },
    { value: 'food', label: 'Food & Beverages' }
  ];

  displayedColumns = ['image', 'name', 'category', 'price', 'stock', 'rating', 'actions'];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.setupSearch();
    this.loadProducts();
    this.checkAuthentication();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupSearch(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(searchTerm => {
        if (searchTerm) {
          this.productService.search(searchTerm);
        } else {
          this.loadProducts();
        }
      });
  }

  private loadProducts(): void {
    this.loading = true;
    this.productService.loadProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.loading = false;
        },
        error: (error) => {
          this.loading = false;
          this.snackBar.open('Error loading products', 'Close', {
            duration: 3000,
            panelClass: 'error-snack'
          });
          console.error('Error loading products:', error);
        }
      });
  }

  private checkAuthentication(): void {
    if (!this.authService.isAuthenticated()) {
      this.snackBar.open('Please login to add items to cart', 'Login', {
        duration: 5000
      }).onAction().subscribe(() => {
        this.router.navigate(['/login']);
      });
    }
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.productService.filterByCategory(category);
  }

  filterByPrice(): void {
    this.productService.filterByPriceRange(this.priceRange.min, this.priceRange.max);
  }

  sortProducts(sortOption: string): void {
    this.productService.sortProducts(sortOption);
  }

  addToCart(product: Product): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    this.cartService.addItem(product).subscribe({
      next: () => {
        this.snackBar.open(`${product.name} added to cart`, 'View Cart', {
          duration: 3000
        }).onAction().subscribe(() => {
          this.router.navigate(['/cart']);
        });
      },
      error: (err) => {
        this.snackBar.open('Error adding to cart', 'Close', {
          duration: 3000,
          panelClass: 'error-snack'
        });
        console.error('Error adding to cart:', err);
      }
    });
  }

  openProductDetail(product: Product): void {
    const dialogRef = this.dialog.open(ProductDetailDialogComponent, {
      data: product,
      width: '600px',
      maxHeight: '80vh',
      panelClass: 'product-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'added-to-cart') {
        this.snackBar.open('Product added to cart', 'Close', { duration: 2000 });
      }
    });
  }

  toggleFavorite(product: Product): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    product.isFavorite = !product.isFavorite;
    this.productService.toggleFavorite(product.id, product.isFavorite)
      .subscribe({
        next: () => {
          const message = product.isFavorite ? 'Added to favorites' : 'Removed from favorites';
          this.snackBar.open(message, 'Close', { duration: 2000 });
        },
        error: () => {
          product.isFavorite = !product.isFavorite; // Revert on error
          this.snackBar.open('Error updating favorites', 'Close', { duration: 2000 });
        }
      });
  }

  shareProduct(product: Product): void {
    const shareUrl = `${window.location.origin}/products/${product.id}`;

    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: shareUrl
      }).catch(err => console.log('Error sharing:', err));
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareUrl).then(() => {
        this.snackBar.open('Product link copied to clipboard', 'Close', { duration: 2000 });
      });
    }
  }

  onPageChange(event: any): void {
    this.productService.changePage(event.pageIndex, event.pageSize);
  }
}