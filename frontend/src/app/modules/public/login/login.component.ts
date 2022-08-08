import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import UserService from '@core/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
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
      this.router.navigate([ 'admin','dashboard']);
    }
  }

  submit() {
    const { email, password } = this.loginForm.value;
    this.userService.login(email, password)
      .subscribe((response: any) => {
        if (response.error) {
          // TODO: toast error
        } else {
          // TODO: toast success
          this.userService.persistState(response.data);
          this.router.navigate([ 'admin', 'dashboard']);
        }
      });
  }
}
