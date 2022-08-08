import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import UserService from '@core/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  constructor(private router: Router, private userService: UserService) {
    // Trigger the user state validation
    this.userService.refreshState();
  }
}
