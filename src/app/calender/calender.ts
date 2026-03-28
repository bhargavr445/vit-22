import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-calender',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './calender.html',
  styleUrl: './calender.css',
})
export class Calender {
  name2: string;
  id2: string;

  testForm = new FormGroup({
    name: new FormControl('')
  })


  submitForm2() {
    console.log('This is called..');
  }
}
