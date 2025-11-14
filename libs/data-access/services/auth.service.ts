import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'manager';
  permissions: string[];
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  public redirectUrl?: string;

  constructor(private http: HttpClient) {
    // Load user from localStorage if available
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    return user?.role === 'admin';
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>('/api/auth/login', { email, password }).pipe(
      map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      })
    );
  }

  logout(): Observable<void> {
    return this.http.post<void>('/api/auth/logout', {}).pipe(
      map(() => {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
      })
    );
  }

  hasPermission(permission: string): boolean {
    const user = this.currentUserSubject.value;
    return user?.permissions?.includes(permission) ?? false;
  }
}