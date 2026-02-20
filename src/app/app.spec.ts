import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { CourseService } from './course-service';
import { RouterTestingModule } from '@angular/router/testing';

describe('App', () => {
  let component: App;
  let fixture: ComponentFixture<App>;
  let courseService: CourseService;  // Better to type it properly

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, RouterTestingModule],
      // Don't provide CourseService here - component provides it
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    
    // ✅ Get the component-level service instance
    courseService = fixture.debugElement.injector.get(CourseService);
    
    await fixture.whenStable();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', async () => {
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Bhargav');
  });

  it('should click button and update name', async () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector("button");
    expect(button).toBeTruthy();
    button.click();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Bhargav');
  });

it('should mock data coming from service', async () => {
  const srSpy = vi.spyOn(courseService, 'getName').mockReturnValue('My Own Value');
  
  fixture.detectChanges(); // ✅ Initial render
  
  const button: HTMLButtonElement = fixture.nativeElement.querySelector("button");
  expect(button).toBeTruthy();
  
  button.click();
  fixture.detectChanges(); // ✅ Trigger change detection after click
  setTimeout(() => {

    expect(srSpy).toHaveBeenCalledTimes(1);
    
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('My Own Value');
  }, 2000)
});

  

  it('should call setVehicleType on change', async () => {
    const srSpy = vi.spyOn(courseService, 'setVehicleType');
    const select = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
    
    select.value = 'tesla';
    select.dispatchEvent(new Event('change'));
    await fixture.whenStable();
    
    expect(srSpy).toHaveBeenCalledWith('tesla');
  });

  it('should call setVehicleType on change (native-2)', async () => {
    const srSpy = vi.spyOn(courseService, 'setVehicleType');
    const select = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
    select.value = '';
    select.dispatchEvent(new Event('change'));
    expect(srSpy).toBeCalledTimes(0);
  });

  it('should test updateNameById', () => {
    component.updateNameById('GBR');
    expect(component.nameById()).toBe('GBR');
  });

  it('should test updateNameById with empty value', () => {
    component.updateNameById('');
    expect(component.nameById()).toBe('');
  });
});