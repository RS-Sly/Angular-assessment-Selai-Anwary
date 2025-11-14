import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap, delay } from 'rxjs/operators';
import { Product } from '../models/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  public cartItems$ = this.cartItemsSubject.asObservable();

  private apiUrl = '/api/cart';

  constructor(private http: HttpClient) {
    this.loadCart();
  }

  private loadCart(): void {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItemsSubject.next(JSON.parse(savedCart));
    }
  }

  addItem(product: Product): Observable<void> {
    // FOR ASSESSMENT: Mock implementation without API calls
    console.log('[CartService] Adding item:', product.name);
    const currentItems = this.cartItemsSubject.value;
    const existingItem = currentItems.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      currentItems.push({ product, quantity: 1 });
    }

    this.cartItemsSubject.next([...currentItems]);
    this.saveCart();
    return of(void 0).pipe(delay(200));
  }

  removeItem(productId: string): Observable<void> {
    // FOR ASSESSMENT: Mock implementation
    console.log('[CartService] Removing item:', productId);
    const currentItems = this.cartItemsSubject.value.filter(
      item => item.product.id !== productId
    );
    this.cartItemsSubject.next(currentItems);
    this.saveCart();
    return of(void 0).pipe(delay(200));
  }

  updateQuantity(productId: string, quantity: number): Observable<void> {
    // FOR ASSESSMENT: Mock implementation
    console.log('[CartService] Updating quantity:', productId, quantity);
    const currentItems = this.cartItemsSubject.value;
    const item = currentItems.find(i => i.product.id === productId);
    if (item) {
      item.quantity = quantity;
      this.cartItemsSubject.next([...currentItems]);
      this.saveCart();
    }
    return of(void 0).pipe(delay(200));
  }

  clearCart(): Observable<void> {
    // FOR ASSESSMENT: Mock implementation
    console.log('[CartService] Clearing cart');
    this.cartItemsSubject.next([]);
    this.saveCart();
    return of(void 0).pipe(delay(200));
  }

  getTotal(): Observable<number> {
    return this.cartItems$.pipe(
      map(items => items.reduce((total, item) =>
        total + (item.product.price * item.quantity), 0
      ))
    );
  }

  private saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItemsSubject.value));
  }
}