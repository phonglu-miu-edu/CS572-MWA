import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddJockeyDialogComponent } from '@app/modules/admin/jockey/add-jockey-dialog/add-jockey-dialog.component';
import JockeyModel from '@app/modules/admin/jockey/jockey.model';
import { Subscription } from 'rxjs';
import JockeyService from './jockey.service';

@Component({
  selector: 'app-jockey',
  templateUrl: './jockey.component.html',
  styleUrls: ['./jockey.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class JockeyComponent {
  expandedElement: JockeyModel | null;
  getJockeysSub!: Subscription;
  createJockeySub!: Subscription;
  page = 1;
  pageSize = 10;
  displayedColumns: string[] = ['name', 'description', 'picture'];
  displayedColumnsWithExpand = [...this.displayedColumns, 'expand'];
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
    this.getJockeysSub = this.jockeyService.get(this.page, this.pageSize)
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
      if (result) {
        const { name, description, picture } = result;
        this.createJockeySub = this.jockeyService.create(name, description, picture)
          .subscribe(response => {
            this.getDataSource();
          });
      }
    });
  }
}
