import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap, delay } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  public products$ = this.productsSubject.asObservable();

  private apiUrl = '/api/products';

  // Mock data for assessment demo
  // Using data URIs for images to work offline without external dependencies
  private mockProducts: Product[] = [
    {
      id: '1',
      name: 'Wireless Headphones',
      description: 'Premium noise-cancelling wireless headphones with 30-hour battery life',
      price: 299.99,
      category: 'electronics',
      imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iIzM5NTFiNSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfjokgSGVhZHBob25lczwvdGV4dD48L3N2Zz4=',
      stock: 45,
      rating: 4.5,
      reviewCount: 328,
      isFavorite: false,
      tags: ['audio', 'wireless', 'premium']
    },
    {
      id: '2',
      name: 'Smart Watch Pro',
      description: 'Fitness tracking smartwatch with heart rate monitor and GPS',
      price: 399.99,
      category: 'electronics',
      imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iI2U5MWU2MyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjIwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuKMmuKPsSBXYXRjaDwvdGV4dD48L3N2Zz4=',
      stock: 23,
      rating: 4.7,
      reviewCount: 512,
      isFavorite: true,
      tags: ['wearable', 'fitness', 'smart']
    },
    {
      id: '3',
      name: 'Cotton T-Shirt',
      description: 'Comfortable 100% organic cotton t-shirt in various colors',
      price: 29.99,
      category: 'clothing',
      imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iIzRjYWY1MCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjIwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfkZUgVC1TaGlydDwvdGV4dD48L3N2Zz4=',
      stock: 150,
      rating: 4.2,
      reviewCount: 89,
      isFavorite: false,
      tags: ['casual', 'cotton', 'eco-friendly']
    },
    {
      id: '4',
      name: 'JavaScript: The Complete Guide',
      description: 'Comprehensive guide to modern JavaScript and ES6+ features',
      price: 49.99,
      category: 'books',
      imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iI2ZmYzEwNyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjIwIiBmaWxsPSIjMzMzIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+8J+TmiBKUyBCb29rPC90ZXh0Pjwvc3ZnPg==',
      stock: 67,
      rating: 4.8,
      reviewCount: 234,
      isFavorite: true,
      tags: ['programming', 'education', 'javascript']
    },
    {
      id: '5',
      name: 'Organic Coffee Beans',
      description: 'Fair trade organic coffee beans from Colombia, medium roast',
      price: 18.99,
      category: 'food',
      imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iIzc5NTU0OCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjIwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuKYleKYlSBDb2ZmZWU8L3RleHQ+PC9zdmc+',
      stock: 89,
      rating: 4.6,
      reviewCount: 156,
      isFavorite: false,
      tags: ['organic', 'fair-trade', 'beverage']
    },
    {
      id: '6',
      name: 'Mechanical Keyboard',
      description: 'RGB mechanical gaming keyboard with cherry MX switches',
      price: 159.99,
      category: 'electronics',
      imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iIzljMjdiMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuKMqO+4jyBLZXlib2FyZDwvdGV4dD48L3N2Zz4=',
      stock: 34,
      rating: 4.4,
      reviewCount: 445,
      isFavorite: false,
      tags: ['gaming', 'rgb', 'mechanical']
    },
    {
      id: '7',
      name: 'Running Shoes',
      description: 'Lightweight running shoes with responsive cushioning',
      price: 89.99,
      category: 'clothing',
      imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iIzAwYmNkNCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjIwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfkZ8gU2hvZXM8L3RleHQ+PC9zdmc+',
      stock: 78,
      rating: 4.3,
      reviewCount: 267,
      isFavorite: true,
      tags: ['athletic', 'running', 'footwear']
    },
    {
      id: '8',
      name: 'Angular Development Cookbook',
      description: 'Advanced recipes for Angular developers',
      price: 44.99,
      category: 'books',
      imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iI2RkMDAzMSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfkpogQW5ndWxhcjwvdGV4dD48L3N2Zz4=',
      stock: 42,
      rating: 4.7,
      reviewCount: 189,
      isFavorite: false,
      tags: ['angular', 'web-development', 'programming']
    }
  ];

  constructor(private http: HttpClient) {
    // Initialize with mock data
    this.productsSubject.next(this.mockProducts);
  }

  loadProducts(): Observable<Product[]> {
    // FOR ASSESSMENT: Return mock data instead of API call
    console.log('[ProductService] Loading mock products');
    return of(this.mockProducts).pipe(
      delay(300), // Simulate network delay
      tap(products => this.productsSubject.next(products))
    );
  }

  search(searchTerm: string): void {
    // FOR ASSESSMENT: Filter mock data locally
    console.log('[ProductService] Searching for:', searchTerm);
    const filtered = this.mockProducts.filter(p =>
      p.name.toLowerCase().includes(searchTerm?.toLowerCase() || '') ||
      p.description.toLowerCase().includes(searchTerm?.toLowerCase() || '')
    );
    this.productsSubject.next(filtered);
  }

  filterByCategory(category: string): void {
    console.log('[ProductService] Filtering by category:', category);
    if (category === 'all') {
      this.productsSubject.next(this.mockProducts);
    } else {
      const filtered = this.mockProducts.filter(p => p.category === category);
      this.productsSubject.next(filtered);
    }
  }

  filterByPriceRange(min: number, max: number): void {
    const currentProducts = this.productsSubject.value;
    const filtered = currentProducts.filter(p => p.price >= min && p.price <= max);
    this.productsSubject.next(filtered);
  }

  sortProducts(sortBy: string): void {
    const currentProducts = [...this.productsSubject.value];
    switch (sortBy) {
      case 'price-asc':
        currentProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        currentProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        currentProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        currentProducts.sort((a, b) => b.rating - a.rating);
        break;
    }
    this.productsSubject.next(currentProducts);
  }

  toggleFavorite(productId: string, isFavorite: boolean): Observable<void> {
    // FOR ASSESSMENT: Update mock data locally
    console.log('[ProductService] Toggle favorite:', productId, isFavorite);
    const product = this.mockProducts.find(p => p.id === productId);
    if (product) {
      product.isFavorite = isFavorite;
      this.productsSubject.next([...this.mockProducts]);
    }
    return of(void 0).pipe(delay(200));
  }

  changePage(pageIndex: number, pageSize: number): void {
    // FOR ASSESSMENT: Mock pagination
    console.log('[ProductService] Change page:', pageIndex, pageSize);
    // In real app, this would fetch different pages
    // For demo, just keep showing all products
  }
}