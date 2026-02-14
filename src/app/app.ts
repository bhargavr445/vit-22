import { Component, computed, inject, Signal, signal } from '@angular/core';
import { Course } from './course';
import { Table } from './table/table';

@Component({
  selector: 'app-root',
  imports: [Table],
  providers: [Course],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  // age: number = 30
  age = signal<number>(30);
  nameById = signal('');

  readonly #course = inject(Course);
  protected vehicleResponse: Signal<any> = computed(() => this.#course.vehicleResponse());
  protected name = signal('Bhargav');
  protected optionsList = [
    { label: 'Tesla', value: 'tesla' },
    { label: 'Merc', value: 'merc' },
    { label: 'Toyota', value: 'toyota' }
  ]

  constructor() {
    // fetch data from backend 
    this.add(10, 20, 30, 40, 50);
  }

  protected updateName() {
    // setTimeout(() => {
    // this.age = 40;
    this.age.set(40);
    // }, 2000);
    // this.name.set('GBR');
    this.name.set(this.#course.getName());
  }

  updateNameById(id: string) {
    this.nameById.set(id);
  }

  add(...allNum: number[]) {
    console.log(allNum);
    const res = allNum.reduce((c, p) => {
      return c + p
    }, 0)
    console.log(res);
  }

  protected vehicleNameSelectionChange(event: any) {
    if (event.target.value) {
      this.#course.setVehicleType(event.target.value);
    }
  }

}

