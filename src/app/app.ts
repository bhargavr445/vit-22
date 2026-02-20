import { Component, computed, inject, Signal, signal } from '@angular/core';
import { CourseService } from './course-service';
import { Table } from './table/table';
import { Header } from "./header/header";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Table, Header, RouterOutlet],
  providers: [CourseService],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  // age: number = 30
  age = signal<number>(30);
  nameById = signal('');

  readonly #course = inject(CourseService);
  // protected vehicleResponse: Signal<any> = computed(() => this.#course.vehicleResponse());
  protected name = signal('Bhargav');
  protected optionsList = [
    { label: 'Tesla', value: 'tesla' },
    { label: 'Merc', value: 'merc' },
    { label: 'Toyota', value: 'toyota' }
  ]

  protected updateName() {
    // setTimeout(() => {
    // this.age = 40;
    // this.age.set(40);
    // }, 2000);
    // this.name.set('GBR');
    const x = this.#course.getName();
    this.name.set(x);
  }

  updateNameById(id: string) {
    this.nameById.set(id);
  }

  protected vehicleNameSelectionChange(event: any) {
    if (event.target.value) {
      this.#course.setVehicleType(event.target.value);
    }
  }

}

