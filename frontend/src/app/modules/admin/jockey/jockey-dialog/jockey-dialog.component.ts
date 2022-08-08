import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import SharedService from '@app/modules/shared/shared.service';
import { FileService } from '@core/file/file.service';
import { BehaviorSubject, Subscription } from 'rxjs';

export interface DialogData {
  id: string;
  name: string;
  description: string;
  picture: string;
}

@Component({
  selector: 'app-jockey-dialog',
  templateUrl: 'jockey-dialog.component.html',
  styleUrls: ['./jockey-dialog.component.css']
})
export class JockeyDialogComponent {
  @ViewChild('fileInput') fileInput: ElementRef;
  form: FormGroup;
  processing$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  getFileUploadUrlSub!: Subscription;
  uploadSub!: Subscription;

  constructor(
    private fb: FormBuilder,
    private fileService: FileService,
    public dialogRef: MatDialogRef<JockeyDialogComponent>,
    public sharedService: SharedService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.form = fb.group({
      id: data.id,
      name: [data.name, [Validators.required]],
      description: data.description,
      picture: [data.picture, [Validators.required]]
    });
  }

  uploadFile = (event: Event) => {
    this.processing$.next(true);

    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;

    if (fileList) {
      const file = fileList[0];

      if (file) {
        try {
        this.getFileUploadUrlSub = this.fileService.getFileUploadSchema(file)
          .subscribe((response: any) => {
            if (response.error) {
              // TODO: toast error
            } else {
              // TODO: toast success
              this.fileService.upload(response.data, file)
                .subscribe((file: File) => {
                  if (file) {
                    this.form.patchValue({ picture: response.data.fileUrl });
                  }

                  this.processing$.next(false);
                });
            }
          });
        } catch (e) {
          console.log(e);
          this.processing$.next(false);
        }
      }
    } else {
      this.processing$.next(false);
    }
  };

  onAddClick() {
    if (this.form.valid) {
      this.onClose(this.form.value);
    }
  };

  onCancelClick = (): void => {
    this.onClose();
  };

  onClose = (data?: DialogData): void => {
    if (this.getFileUploadUrlSub) {
      this.getFileUploadUrlSub.unsubscribe();
    }

    if (this.uploadSub) {
      this.uploadSub.unsubscribe();
    }

    this.dialogRef.close(data);
  };
}
