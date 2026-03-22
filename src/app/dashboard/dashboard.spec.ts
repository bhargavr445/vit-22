import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashboard } from './dashboard';
import { DashboardService } from './dashboard-service';
import { of, throwError } from 'rxjs';

describe.skip('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;
  let dashboardService: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashboard],
      // providers: [DashboardService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    // dashboardService = TestBed.inject(DashboardService);
    dashboardService = fixture.debugElement.injector.get(DashboardService);
    await fixture.whenStable();
    
  });

  it('should create Dashboard', () => {
    expect(component).toBeTruthy();
  });

  it('should mock data coming from service', async () => {
    const srSpy = vi.spyOn(dashboardService, 'sendName').mockReturnValue('My Own Value');
    const button: HTMLButtonElement = fixture.nativeElement.querySelector("button"); // or ".save-btn"
    expect(button).toBeTruthy();
    button.click();
    await fixture.whenStable();
    expect(srSpy).toHaveBeenCalledTimes(1);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('My Own Value');
  });

    it('should test data coming from service', async () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector("button"); // or ".save-btn"
    expect(button).toBeTruthy();
    button.click();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Neeraja');
  });

  it('should call submit function and expect success API response', () => {
    const save1Spy = vi.spyOn(dashboardService, 'save1').mockReturnValue(of({name: 'Bhargav'}));
    component.submit();
    expect(save1Spy).toHaveBeenCalledOnce()
  })

    it('should call submit function and expect success API response', () => {
    const save1Spy = vi.spyOn(dashboardService, 'save1').mockReturnValue(throwError({}));
    component.submit();
    expect(save1Spy).toHaveBeenCalledTimes(1);
  })

});
