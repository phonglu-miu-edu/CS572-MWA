import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import UserService from '../modules/core/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLoggedIn: boolean = false;
  sub!: Subscription;
  fullname: string = '';

  constructor(private router: Router, private userService: UserService) {
    this.sub = userService.userState$.subscribe(userState => {
      if (userState) {
        this.isLoggedIn = true;
        this.fullname = userState.fullname;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  logout = () => {
    this.userService.logout();
    this.router.navigate(['login']);
  };
}
