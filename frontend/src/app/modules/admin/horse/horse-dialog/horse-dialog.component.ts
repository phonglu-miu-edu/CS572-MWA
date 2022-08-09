import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import JockeyModel from '@app/modules/admin/jockey/jockey.model';
import JockeyService from '@app/modules/admin/jockey/jockey.service';
import SharedService from '@app/modules/shared/shared.service';
import { FileService } from '@core/file/file.service';
import { BehaviorSubject, Subscription } from 'rxjs';

export interface DialogData {
  id: string;
  name: string;
  description: string;
  picture: string;
  breed: string;
  weight: number;
  jockey: JockeyModel;
}

@Component({
  selector: 'app-horse-dialog',
  templateUrl: 'horse-dialog.component.html',
  styleUrls: ['./horse-dialog.component.css']
})
export class HorseDialogComponent {
  @ViewChild('fileInput') fileInput: ElementRef;
  form: FormGroup;
  processing$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  getJockeysSub!: Subscription
  getFileUploadUrlSub!: Subscription;
  uploadSub!: Subscription;

  breeds = [
    "American Paint Horse",
    "American Quarter Horse",
    "American Saddlebred",
    "Andalusian and Lusitano",
    "Appaloosa",
    "Arabian",
    "Belgian",
    "Clydesdale",
    "Colorado Rangerbred",
    "Dutch Warmblood",
    "Fell Pony",
    "Friesian",
    "Gypsy Vanner",
    "Hackney Horse and Hackney Pony",
    "Haflinger",
    "Hanoverian",
    "Holsteiner",
    "Icelandic Horse",
    "Kentucky Mountain Saddle Horse and Mountain Pleasure Horse",
    "Miniature Horse",
    "Missouri Fox Trotter",
    "Morgan",
    "Mustang",
    "National Show Horse",
    "Norwegian Fjord",
    "Oldenburg",
    "Paso Fino",
    "Percheron",
    "Peruvian Paso",
    "Pony of the Americas",
    "Racking Horse",
    "Rocky Mountain Horse",
    "Selle Francais",
    "Shetland Pony",
    "Shire",
    "Standardbred",
    "Tennessee Walking Horse",
    "Thoroughbred",
    "Trakehner",
    "Westphalian",
    "Welsh Pony and Welsh Cob"
  ];
  jockeys: JockeyModel[];

  constructor(
    private fb: FormBuilder,
    private fileService: FileService,
    public dialogRef: MatDialogRef<HorseDialogComponent>,
    public sharedService: SharedService,
    public jockeyService: JockeyService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.form = fb.group({
      id: data.id,
      name: [data.name, [Validators.required]],
      description: data.description,
      picture: [data.picture, [Validators.required]],
      breed: [data.breed, [Validators.required]],
      weight: [data.weight, [Validators.required]],
      jockey: [data.jockey, [Validators.required]]
    });

    this.getDataSource();
  }

  getDataSource = () => {
    this.getJockeysSub = this.jockeyService.get(1, 20)
      .subscribe(response => {
        this.jockeys = response.data;
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
          this.processing$.next(false);
        }
      }
    } else {
      this.processing$.next(false);
    }
  };

  onAddClick() {
    if (this.form.valid) {
      // if (this.form.value.jockey) {
      //   const { name, picture, _id } = this.form.value.jockey;
      //   this.form.setValue({ jockey: { name, picture, _id } as JockeyModel });
      // }

      this.onClose(this.form.value);
    }
  };

  onCancelClick = (): void => {
    this.onClose();
  };

  onClose = (data?: DialogData): void => {
    if (this.getJockeysSub) {
      this.getJockeysSub.unsubscribe();
    }

    if (this.getFileUploadUrlSub) {
      this.getFileUploadUrlSub.unsubscribe();
    }

    if (this.uploadSub) {
      this.uploadSub.unsubscribe();
    }

    this.dialogRef.close(data);
  };
}
