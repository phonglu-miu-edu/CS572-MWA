import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddJockeyDialogComponent } from '@app/modules/admin/jockey/add-jockey-dialog/add-jockey-dialog.component';
import { Subscription } from 'rxjs';
import JockeyService from './jockey.service';

@Component({
  selector: 'app-jockey',
  templateUrl: './jockey.component.html',
  styleUrls: ['./jockey.component.css']
})
export class JockeyComponent {
  getJockeysSub!: Subscription;
  page = 1;
  pageSize = 10;
  displayedColumns: string[] = ['name', 'picture', 'dob'];
  dataSource = [];

  constructor(private jockeyService: JockeyService, private dialog: MatDialog) {
    this.getDataSource();
  }

  ngOnDestroy() {
    if (this.getJockeysSub) {
      this.getJockeysSub.unsubscribe();
    }
  }

  getDataSource = () => {
    this.jockeyService.get(this.page, this.pageSize)
      .subscribe(response => {
        this.dataSource = response.data;
      });
  };

  openDialog(): void {
    const dialogRef = this.dialog.open(AddJockeyDialogComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
