import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  id: string;
  entity: string;
  name: string;
}

@Component({
  selector: 'app-delete-dialog-component',
  templateUrl: 'delete-dialog.component.html',
})
export class DeleteDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
  }
}
