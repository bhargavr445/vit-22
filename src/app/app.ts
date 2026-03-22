import { Component, computed, inject, Signal, signal } from '@angular/core';
import { CourseService } from './course-service';
import { Table } from './table/table';
import { Header } from "./header/header";
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';

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
  readonly http = inject(HttpClient);
  // protected vehicleResponse: Signal<any> = computed(() => this.#course.vehicleResponse());
  protected name = signal('Bhargav');
  protected optionsList = [
    { label: 'Tesla', value: 'tesla' },
    { label: 'Merc', value: 'merc' },
    { label: 'Toyota', value: 'toyota' }
  ]

  stu = {
    'stu.me.id': 101
  }

  constructor() {
    console.log(this.stu['stu.me.id']);
  }

  protected updateName() {
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

  getData(name: string, id?: number) {
    let params = new HttpParams();
    console.log(params);
    // params = params.set('kiran', 'test123')
    this.http.get('https://dummy.restapiexample.com/api/v1/employees', {params}).subscribe(
      () => {},
      () => {}
    );
  }

}

