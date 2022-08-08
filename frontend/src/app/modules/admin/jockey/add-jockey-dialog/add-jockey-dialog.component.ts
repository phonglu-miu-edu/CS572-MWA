import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileService } from '@core/file/file.service';
import { Subscription } from 'rxjs';

export interface DialogData {
  name: string;
  description: string;
  picture: string;
}

@Component({
  selector: 'add-jockey',
  templateUrl: 'add-jockey-dialog.component.html',
  styleUrls: ['./add-jockey-dialog.component.css']
})
export class AddJockeyDialogComponent {
  @ViewChild('fileInput') fileInput: ElementRef;

  getFileUploadUrlSub!: Subscription;
  uploadSub!: Subscription;

  constructor(
    public dialogRef: MatDialogRef<AddJockeyDialogComponent>,
    private fileService: FileService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
  }

  uploadFile = (event: Event) => {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList && fileList[0]) {
      const file = fileList[0];
      this.getFileUploadUrlSub = this.fileService.getFileUploadSchema(file)
        .subscribe((response: any) => {
          if (response.error) {
            // TODO: toast error
          } else {
            // TODO: toast success
            this.uploadSub = this.fileService.upload(response.data, file)
              .subscribe((uploadResponse: any) => {
                debugger
              });
          }
        });
    }
  };

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
