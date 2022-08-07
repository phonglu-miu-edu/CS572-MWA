import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import UserService from './user/user.service';

@Component({
  selector: 'app-login',
  template: `
    <style>
      mat-card {
        max-width: 20%;
        margin: 2em auto;
        text-align: center;
      }

      mat-form-field {
        display: block;
      }
    </style>
    <mat-card>
      <mat-card-content>
        <form [formGroup]="loginForm" (submit)="submit()">
          <h2>Log In</h2>
          <mat-form-field class="full-width-input">
            <input matInput type="email" placeholder="Email" formControlName="email" required>
          </mat-form-field>
          <mat-form-field class="full-width-input">
            <input matInput type="password" placeholder="Password" formControlName="password" required>
          </mat-form-field>
          <button mat-raised-button color="primary">Login</button>
        </form>
      </mat-card-content>
    </mat-card>
  `
})
export class LoginComponent {
  loginForm: FormGroup = this.fb.group({
    email: ['admin@gmail.com', Validators.required],
    password: ['MyP@ssword', Validators.required]
  });

  constructor(private router: Router, private fb: FormBuilder, private userService: UserService) {
    this.userService.refreshState();
    const userState = this.userService.getUserState();

    if (userState) {
      this.router.navigate(['dashboard']);
    }
  }

  async submit() {
    const { email, password } = this.loginForm.value;
    this.userService.login(email, password)
      .subscribe((response: any) => {
        this.userService.persistState(response.token);
        this.router.navigate(['dashboard']);
      });
  }
}
