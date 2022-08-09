import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor()
  {

  }

  ngOnInit()
  {
    console.log("dashboard component on init");
  }

}
