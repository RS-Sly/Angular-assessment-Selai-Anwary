import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AdminService } from './admin.service';

describe('AdminService', () => {
  let service: AdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdminService]
    });
    service = TestBed.inject(AdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load dashboard data', (done) => {
    service.loadDashboardData().subscribe(stats => {
      expect(stats).toBeTruthy();
      expect(stats.totalUsers).toBeGreaterThan(0);
      expect(stats.totalProducts).toBeGreaterThan(0);
      expect(stats.totalOrders).toBeGreaterThan(0);
      expect(stats.revenue).toBeGreaterThan(0);
      done();
    });
  });

  it('should update settings', (done) => {
    const settings = { siteName: 'Test', maintenance: false };
    service.updateSettings(settings).subscribe(() => {
      expect(true).toBeTruthy();
      done();
    });
  });

  it('should get users', (done) => {
    service.getUsers().subscribe(users => {
      expect(users).toBeTruthy();
      expect(users.length).toBeGreaterThan(0);
      done();
    });
  });

  it('should delete user', (done) => {
    service.deleteUser('1').subscribe(() => {
      expect(true).toBeTruthy();
      done();
    });
  });

  it('should update user', (done) => {
    const userData = { name: 'Test User', email: 'test@example.com' };
    service.updateUser('1', userData).subscribe(result => {
      expect(result).toBeTruthy();
      expect(result.id).toBe('1');
      done();
    });
  });
});
