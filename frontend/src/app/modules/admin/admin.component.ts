import { Component } from '@angular/core';
import { Router } from '@angular/router';
import UserService from '@core/user/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-protected',
  template: `
    <style>
      mat-sidenav-content {
        min-height: 400px;
        padding: 20px;
      }
    </style>
    <mat-sidenav-container *ngIf="isLoggedIn">
      <mat-sidenav opened mode="side">
        <mat-nav-list>
          <a mat-list-item [routerLink]="['dashboard']"> Dashboard </a>
          <a mat-list-item [routerLink]="['jockey']"> Jockeys </a>
          <a mat-list-item [routerLink]="['horse']"> Horses </a>
          <a mat-list-item [routerLink]="['race']"> Races </a>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `
})
export class AdminComponent {
  isLoggedIn: boolean = false;
  sub!: Subscription;

  constructor(private router: Router, private userService: UserService) {
    this.sub = userService.userState$.subscribe(userState => {
      this.isLoggedIn = !!userState;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
