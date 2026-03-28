import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';

@Component({
  imports: [FormField],
  template: `
    <input type="email" [formField]="signUpForm.userName" />
    <input type="password" [formField]="signUpForm.password" />
    <input type="password" [formField]="signUpForm.confirmPassword" />
  `,
})
export class Signup {

  signUpModel = signal<SignUpI>({
    userName: '',
    password: '',
    confirmPassword: '',
  })

  signUpForm = form(this.signUpModel);
  
}

export interface SignUpI {
  userName: string;
  password: string;
  confirmPassword: string;
}
