import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Table } from './table';
import { inputBinding, signal } from '@angular/core';

describe('Table', () => {
  let component: Table;
  let fixture: ComponentFixture<Table>;

  const dateList = signal<any[]>([]);
  const headers = signal<any[]>([]);

  beforeEach(async () => {
    dateList.set([]);
    headers.set([]);
    await TestBed.configureTestingModule({
      imports: [Table]
    }).compileComponents();
    fixture = TestBed.createComponent(Table, {
      bindings: [
        inputBinding('dateList', dateList),
        // inputBinding('headers', headers)
      ]
    });
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have headers length', async () => {
    dateList.set(['id']);
    await fixture.whenStable()
    expect(component.headersLength()).toEqual(1);
  })
});
