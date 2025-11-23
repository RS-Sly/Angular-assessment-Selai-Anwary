import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSliderModule } from '@angular/material/slider';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ProductListComponent } from './product-list.component';
import { ProductService } from '@data-access/services/product.service';
import { CartService } from '@data-access/services/cart.service';

/**
 * Test file for ProductListComponent
 *
 * Updated for standalone component - component is now imported instead of declared
 */
describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProductListComponent,  // Standalone component goes in imports
        BrowserAnimationsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatSnackBarModule,
        MatSliderModule,
        MatChipsModule,
        MatTooltipModule
      ],
      providers: [ProductService, CartService]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have products observable', () => {
    expect(component.products$).toBeDefined();
  });

  it('should have search form control', () => {
    expect(component.searchControl).toBeDefined();
  });

  it('should filter products on search', () => {
    component.searchControl.setValue('headphones');
    expect(component.searchControl.value).toBe('headphones');
  });

  it('should have categories', () => {
    expect(component.categories).toBeDefined();
    expect(component.categories.length).toBeGreaterThan(0);
  });

  it('should have displayed columns', () => {
    expect(component.displayedColumns).toBeDefined();
    expect(component.displayedColumns.length).toBeGreaterThan(0);
  });
});
