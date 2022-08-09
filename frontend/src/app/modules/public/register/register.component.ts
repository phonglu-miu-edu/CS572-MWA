import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import UserService from '@core/user/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerSub!: Subscription;
  registerForm: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    fullname: ['', Validators.required]
  });

  constructor(private router: Router, private fb: FormBuilder, private userService: UserService) {
    this.userService.refreshState();
    const userState = this.userService.getUserState();

    if (userState) {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnDestroy() {
    if (this.registerSub) {
      this.registerSub.unsubscribe();
    }
  }

  submit() {
    const { email, password, fullname } = this.registerForm.value;
    this.registerSub = this.userService.register(email, password, fullname)
      .subscribe((response: any) => {
        if (response.error) {
          // TODO: toast error
        } else {
          // TODO: toast success
          this.router.navigate(['login']);
        }
      });
  }
}
