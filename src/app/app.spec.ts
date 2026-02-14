import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { Course } from './course';

describe('App', () => {
  let component: App;
  let fixture: ComponentFixture<App>;
  let courseService: any;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        Course
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    component = fixture.componentInstance;
    courseService = fixture.debugElement.injector.get(Course);

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
    const button: HTMLButtonElement = fixture.nativeElement.querySelector("button"); // or ".save-btn"
    expect(button).toBeTruthy();
    button.click();                 // triggers (click)
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('test Service');
  });

  it('should mock data coming from service', async () => {
    const srSpy = vi.spyOn(courseService, 'getName').mockReturnValue('My Own Value');
    const button: HTMLButtonElement = fixture.nativeElement.querySelector("button"); // or ".save-btn"
    expect(button).toBeTruthy();
    button.click();                 // triggers (click)
    await fixture.whenStable();
    expect(srSpy).toHaveBeenCalledOnce();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('My Own Value');
  });

  it('should call setVehicleType on change (native)', async () => {
    const srSpy = vi.spyOn(courseService, 'setVehicleType');
    const select = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
    select.value = 'tesla';                      // set a real string value
    select.dispatchEvent(new Event('change'));   // native change event
    expect(srSpy).toHaveBeenCalledWith('tesla');
  });

    it('should call setVehicleType on change (native)', async () => {
    const srSpy = vi.spyOn(courseService, 'setVehicleType');
    const select = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
    select.value = '';                      // set a real string value
    select.dispatchEvent(new Event('change'));   // native change event
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
