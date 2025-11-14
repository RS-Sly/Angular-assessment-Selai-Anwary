import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CartService } from './cart.service';
import { Product } from '../models/product.model';

describe('CartService', () => {
  let service: CartService;

  const mockProduct: Product = {
    id: '1',
    name: 'Test Product',
    description: 'Test Description',
    price: 99.99,
    category: 'electronics',
    imageUrl: 'test.jpg',
    stock: 10,
    rating: 4.5,
    reviewCount: 100,
    isFavorite: false,
    tags: ['test']
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CartService]
    });
    service = TestBed.inject(CartService);
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add item to cart', (done) => {
    service.addItem(mockProduct).subscribe(() => {
      service.cartItems$.subscribe(items => {
        expect(items.length).toBeGreaterThan(0);
        expect(items[0].product.id).toBe('1');
        done();
      });
    });
  });

  it('should remove item from cart', (done) => {
    service.addItem(mockProduct).subscribe(() => {
      service.removeItem('1').subscribe(() => {
        service.cartItems$.subscribe(items => {
          expect(items.length).toBe(0);
          done();
        });
      });
    });
  });

  it('should calculate total', (done) => {
    service.addItem(mockProduct).subscribe(() => {
      service.getTotal().subscribe(total => {
        expect(total).toBeGreaterThan(0);
        done();
      });
    });
  });

  it('should clear cart', (done) => {
    service.addItem(mockProduct).subscribe(() => {
      service.clearCart().subscribe(() => {
        service.cartItems$.subscribe(items => {
          expect(items.length).toBe(0);
          done();
        });
      });
    });
  });
});
