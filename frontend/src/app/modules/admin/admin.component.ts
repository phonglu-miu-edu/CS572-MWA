import { Component } from '@angular/core';

@Component({
  selector: 'app-protected',
  template: `
    <mat-sidenav-container>
      <mat-sidenav opened mode="side">
        <mat-nav-list>
          <a mat-list-item [routerLink]="['dashboard']"> Dashboard </a>
          <a mat-list-item [routerLink]="['jockey']"> Jockeys </a>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <div style="height: 92vh">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `
})
export class AdminComponent {
}
