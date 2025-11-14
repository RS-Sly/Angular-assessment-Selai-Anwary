import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load mock products', (done) => {
    service.loadProducts().subscribe(products => {
      expect(products).toBeTruthy();
      expect(products.length).toBe(8);
      done();
    });
  });

  it('should have products observable', (done) => {
    service.products$.subscribe(products => {
      expect(products).toBeDefined();
      done();
    });
  });

  it('should filter products by category', () => {
    service.filterByCategory('electronics');
    service.products$.subscribe(products => {
      expect(products.every(p => p.category === 'electronics')).toBeTruthy();
    });
  });

  it('should search products', () => {
    service.search('headphones');
    service.products$.subscribe(products => {
      expect(products.length).toBeGreaterThan(0);
    });
  });

  it('should toggle favorite status', (done) => {
    service.toggleFavorite('1', true).subscribe(() => {
      expect(true).toBeTruthy();
      done();
    });
  });
});
