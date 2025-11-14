import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  revenue: number;
}

@Injectable({ providedIn: 'root' })
export class AdminService {
  private dashboardStatsSubject = new BehaviorSubject<DashboardStats>({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    revenue: 0
  });

  public dashboardStats$ = this.dashboardStatsSubject.asObservable();
  private apiUrl = '/api/admin';

  // Mock dashboard stats
  private mockStats: DashboardStats = {
    totalUsers: 1247,
    totalProducts: 856,
    totalOrders: 3492,
    revenue: 125890.50
  };

  constructor(private http: HttpClient) {}

  loadDashboardData(): Observable<DashboardStats> {
    // FOR ASSESSMENT: Return mock data
    console.log('[AdminService] Loading mock dashboard data');
    this.dashboardStatsSubject.next(this.mockStats);
    return of(this.mockStats).pipe(delay(300));
  }

  updateSettings(settings: any): Observable<void> {
    // FOR ASSESSMENT: Mock implementation
    console.log('[AdminService] Updating settings:', settings);
    return of(void 0).pipe(delay(500));
  }

  getUsers(): Observable<any[]> {
    // FOR ASSESSMENT: Mock implementation
    console.log('[AdminService] Getting users');
    return of([
      { id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'user' }
    ]).pipe(delay(300));
  }

  deleteUser(userId: string): Observable<void> {
    // FOR ASSESSMENT: Mock implementation
    console.log('[AdminService] Deleting user:', userId);
    return of(void 0).pipe(delay(300));
  }

  updateUser(userId: string, userData: any): Observable<any> {
    // FOR ASSESSMENT: Mock implementation
    console.log('[AdminService] Updating user:', userId, userData);
    return of({ ...userData, id: userId }).pipe(delay(300));
  }
}
