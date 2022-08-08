import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import SharedService from '@app/modules/shared/shared.service';
import { FileService } from '@core/file/file.service';
import { BehaviorSubject, Subscription } from 'rxjs';

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
  processing$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  getFileUploadUrlSub!: Subscription;
  uploadSub!: Subscription;

  constructor(
    public dialogRef: MatDialogRef<AddJockeyDialogComponent>,
    public sharedService: SharedService,
    private fileService: FileService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
  }

  uploadFile = (event: Event) => {
    this.processing$.next(true);

    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;

    if (fileList) {
      const file = fileList[0];

      if (file) {
        this.getFileUploadUrlSub = this.fileService.getFileUploadSchema(file)
          .subscribe((response: any) => {
            if (response.error) {
              // TODO: toast error
            } else {
              // TODO: toast success
              this.uploadSub = this.fileService.upload(response.data, file)
                .subscribe((file: File) => {
                  if (file) {
                    this.data.picture = response.data.fileUrl;
                  }

                  this.processing$.next(false);
                });
            }
          });
      }
    }
  };

  onCancelClick(): void {
    if (this.getFileUploadUrlSub) {
      this.getFileUploadUrlSub.unsubscribe();
    }

    if (this.uploadSub) {
      this.uploadSub.unsubscribe();
    }

    this.dialogRef.close();
  }
}
