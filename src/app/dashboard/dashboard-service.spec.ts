import { TestBed } from '@angular/core/testing';

import { DashboardService } from './dashboard-service';

describe('DashboardService', () => {
  let service: DashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashboardService]
    });
    service = TestBed.inject(DashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add 2 numbers', () => {
    const res = service.add(10, 20);
    expect(res).toBe(30)
  })



});
