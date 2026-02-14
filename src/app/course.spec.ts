import { TestBed } from '@angular/core/testing';

import { Course } from './course';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe.only('Course', () => {
  let service: Course;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Course,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(Course);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return string', () => {
    service.serName = 'Hello text';
    expect(service.getName()).toEqual('Hello text');
  });

});
