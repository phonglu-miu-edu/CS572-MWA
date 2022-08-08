import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JockeyDialogComponent } from '@app/modules/admin/jockey/jockey-dialog/jockey-dialog.component';
import JockeyModel from '@app/modules/admin/jockey/jockey.model';
import { DeleteDialogComponent } from '@core/dialogs/delete-dialog.component';
import { Subscription } from 'rxjs';
import JockeyService from './jockey.service';

@Component({
  selector: 'app-jockey',
  templateUrl: './jockey.component.html',
  styleUrls: ['./jockey.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})
export class JockeyComponent {
  expandedElement: JockeyModel | null;
  dialogSub!: Subscription;
  getJockeysSub!: Subscription;
  createJockeySub!: Subscription;
  editJockeysSub!: Subscription;
  page = 1;
  pageSize = 10;
  displayedColumns: string[] = ['name', 'description'];
  displayedColumnsWithExpand = [...this.displayedColumns, 'expand'];
  dataSource = [];

  constructor(private jockeyService: JockeyService, private dialog: MatDialog) {
    this.getDataSource();
  }

  ngOnDestroy() {
    if (this.dialogSub) {
      this.dialogSub.unsubscribe();
    }

    if (this.getJockeysSub) {
      this.getJockeysSub.unsubscribe();
    }

    if (this.createJockeySub) {
      this.createJockeySub.unsubscribe();
    }

    if (this.editJockeysSub) {
      this.editJockeysSub.unsubscribe();
    }
  }

  getDataSource = () => {
    this.getJockeysSub = this.jockeyService.get(this.page, this.pageSize)
      .subscribe(response => {
        this.dataSource = response.data;
      });
  };

  onAddClick(): void {
    const dialogRef = this.createDialogRef({} as JockeyModel);

    this.dialogSub = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const { name, description, picture } = result;
        this.createJockeySub = this.jockeyService.create(name, description, picture)
          .subscribe(response => {
            this.getDataSource();
          });
      }
    });
  }

  onEditClick(jockey: JockeyModel) {
    const dialogRef = this.createDialogRef(jockey);

    this.dialogSub = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const { name, description, picture } = result;

        this.editJockeysSub = this.jockeyService.edit(jockey._id, name, description, picture)
          .subscribe(response => {
            this.getDataSource();
          });
      }
    });
  }

  onDeleteClick(jockey: JockeyModel) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      data: {
        id: jockey._id,
        entity: 'Jockey',
        name: jockey.name
      }
    });

    this.dialogSub = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.editJockeysSub = this.jockeyService.delete(result.id)
          .subscribe(response => {
            this.getDataSource();
          });
      }
    });
  }

  createDialogRef = (jockey: JockeyModel) => {
    return this.dialog.open(JockeyDialogComponent, {
      width: '500px',
      data: {
        ...jockey,
        id: jockey._id
      }
    });
  };
}
