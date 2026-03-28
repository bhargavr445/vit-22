import { Component, signal } from '@angular/core';
import { form, FormField, maxLength, minLength, required, SchemaPathTree } from '@angular/forms/signals';

@Component({
  selector: 'app-signup',
  imports: [FormField],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {

  signUpModel = signal<SignUpI>({
    userName: '',
    password: '',
    confirmPassword: '',
  })

  signUpForm = form(
    this.signUpModel,
    (path: SchemaPathTree<SignUpI>) => {
      required(path.userName, { message: 'User Name is required' })
      maxLength(path.userName, 10, { message: 'Only 10 Chars allowed' })
      minLength(path.userName, 4, { message: 'Min 4 chars required' })
      required(path.password, { message: 'Password is required' })
      required(path.confirmPassword, {
        when: (ctx) => { return !!ctx.valueOf(path.password) },
        message: 'Confirm Password is required'
      })
    }
  );

}

export interface SignUpI {
  userName: string;
  password: string;
  confirmPassword: string;
}

