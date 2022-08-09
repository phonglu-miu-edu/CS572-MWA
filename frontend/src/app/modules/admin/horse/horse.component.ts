import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HorseDialogComponent } from '@app/modules/admin/horse/horse-dialog/horse-dialog.component';
import HorseModel from '@app/modules/admin/horse/horse.model';
import { DeleteDialogComponent } from '@core/dialogs/delete-dialog.component';
import { Subscription } from 'rxjs';
import HorseService from './horse.service';

@Component({
  selector: 'app-horse',
  templateUrl: './horse.component.html',
  styleUrls: ['./horse.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})
export class HorseComponent {
  expandedElement: HorseModel | null;
  dialogSub!: Subscription;
  getHorsesSub!: Subscription;
  createHorseSub!: Subscription;
  editHorsesSub!: Subscription;
  page = 1;
  pageSize = 10;
  displayedColumns: string[] = ['name', 'description', 'breed', 'weight'];
  displayedColumnsWithExpand = [...this.displayedColumns, 'expand'];
  dataSource = [];

  constructor(private horseService: HorseService, private dialog: MatDialog) {
    this.getDataSource();
  }

  ngOnDestroy() {
    if (this.dialogSub) {
      this.dialogSub.unsubscribe();
    }

    if (this.getHorsesSub) {
      this.getHorsesSub.unsubscribe();
    }

    if (this.createHorseSub) {
      this.createHorseSub.unsubscribe();
    }

    if (this.editHorsesSub) {
      this.editHorsesSub.unsubscribe();
    }
  }

  getDataSource = () => {
    this.getHorsesSub = this.horseService.get(this.page, this.pageSize)
      .subscribe(response => {
        this.dataSource = response.data;
      });
  };

  onAddClick(): void {
    const dialogRef = this.createDialogRef({} as HorseModel);

    this.dialogSub = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const { name, description, picture, breed, weight, jockey } = result;
        this.createHorseSub = this.horseService.create(name, description, picture, breed, weight, jockey)
          .subscribe(response => {
            this.getDataSource();
          });
      }
    });
  }

  onEditClick(horse: HorseModel) {
    const dialogRef = this.createDialogRef(horse);

    this.dialogSub = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const { name, description, picture, breed, weight, jockey } = result;

        this.editHorsesSub = this.horseService.edit(horse._id, name, description, picture, breed, weight, jockey)
          .subscribe(response => {
            this.getDataSource();
          });
      }
    });
  }

  onDeleteClick(horse: HorseModel) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      data: {
        id: horse._id,
        entity: 'Horse',
        name: horse.name
      }
    });

    this.dialogSub = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.editHorsesSub = this.horseService.delete(result.id)
          .subscribe(response => {
            this.getDataSource();
          });
      }
    });
  }

  createDialogRef = (horse: HorseModel) => {
    return this.dialog.open(HorseDialogComponent, {
      width: '500px',
      data: {
        ...horse,
        id: horse._id
      }
    });
  };
}
