import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RaceDialogComponent } from '@app/modules/admin/race/race-dialog/race-dialog.component';
import RaceModel from '@app/modules/admin/race/race.model';
import { DeleteDialogComponent } from '@core/dialogs/delete-dialog.component';
import { Subscription } from 'rxjs';
import RaceService from './race.service';

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})
export class RaceComponent {
  expandedElement: RaceModel | null;
  dialogSub!: Subscription;
  getRacesSub!: Subscription;
  createRaceSub!: Subscription;
  editRacesSub!: Subscription;
  page = 1;
  pageSize = 10;
  displayedColumns: string[] = ['start', 'closed'];
  displayedColumnsWithExpand = [...this.displayedColumns, 'expand'];
  dataSource = [];

  constructor(private raceService: RaceService, private dialog: MatDialog) {
    this.getDataSource();
  }

  ngOnDestroy() {
    if (this.dialogSub) {
      this.dialogSub.unsubscribe();
    }

    if (this.getRacesSub) {
      this.getRacesSub.unsubscribe();
    }

    if (this.createRaceSub) {
      this.createRaceSub.unsubscribe();
    }

    if (this.editRacesSub) {
      this.editRacesSub.unsubscribe();
    }
  }

  getDataSource = () => {
    this.getRacesSub = this.raceService.get(this.page, this.pageSize)
      .subscribe(response => {
        this.dataSource = response.data;
      });
  };

  onAddClick(): void {
    const dialogRef = this.createDialogRef({} as RaceModel);

    this.dialogSub = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const { start, closed, horses } = result;

        this.createRaceSub = this.raceService.create(start, closed, horses)
          .subscribe(response => {
            this.getDataSource();
          });
      }
    });
  }

  onEditClick(race: RaceModel) {
    if (!race.closed) {
      const dialogRef = this.createDialogRef(race);

      this.dialogSub = dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const { start, closed, horses } = result;

          this.editRacesSub = this.raceService.edit(race._id, start, closed, horses)
            .subscribe(response => {
              this.getDataSource();
            });
        }
      });
    }
  }

  onDeleteClick(race: RaceModel) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      data: {
        id: race._id,
        entity: 'Race',
        name: ''
      }
    });

    this.dialogSub = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.editRacesSub = this.raceService.delete(result.id)
          .subscribe(response => {
            this.getDataSource();
          });
      }
    });
  }

  createDialogRef = (race: RaceModel) => {
    return this.dialog.open(RaceDialogComponent, {
      width: '500px',
      data: {
        ...race,
        id: race._id
      }
    });
  };
}
