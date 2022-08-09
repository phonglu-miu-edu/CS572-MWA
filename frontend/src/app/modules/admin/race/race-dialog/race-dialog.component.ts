import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import HorseService from '@app/modules/admin/horse/horse.service';
import SharedService from '@app/modules/shared/shared.service';
import { map, Observable, startWith, Subscription } from 'rxjs';

export interface DialogData {
  id: string;
  start: string;
  closed: boolean;
  horses: string[];
}

@Component({
  selector: 'app-race-dialog',
  templateUrl: 'race-dialog.component.html',
  styleUrls: ['./race-dialog.component.css']
})
export class RaceDialogComponent {
  form: FormGroup;
  getHorsesSub!: Subscription;

  @ViewChild('horseInput') horseInput: ElementRef<HTMLInputElement>;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  horseCtrl = new FormControl('');
  filteredHorses: Observable<any[]>;
  horses: any[] = [];
  allHorses: any[] = [];

  constructor(
    private fb: FormBuilder,
    private horseService: HorseService,
    public dialogRef: MatDialogRef<RaceDialogComponent>,
    public sharedService: SharedService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.form = fb.group({
      id: data.id,
      start: [data.start, Validators.required],
      closed: data.closed,
      horses: data.horses
    });

    this.filteredHorses = this.horseCtrl.valueChanges
      .pipe(
        startWith(null),
        map((textValue: string | null) => this.allHorses.slice())
      );

    this.getDataSource();
  }

  getDataSource = () => {
    this.getHorsesSub = this.horseService.get(1, 20)
      .subscribe(response => {
        this.allHorses = response.data;
        this.horseCtrl.setValue(null);
      });
  };

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our horse
    if (value) {
      this.horses.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
    this.form.patchValue({ horses: this.horses });
  }

  remove(horse: string): void {
    this.horses = this.horses.filter(c => c._id !== horse);
    this.form.patchValue({ horses: this.horses });
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const f = this.allHorses.find(c => c._id === event.option.value);
    if (f) {
      this.horses.push(f);
      this.horseInput.nativeElement.value = '';
      this.form.patchValue({ horses: this.horses });
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    const d = (horse: any) => !this.horses || this.horses.length == 0
      || this.horses.find(c => c._id === horse._id) === null || this.horses.find(c => c._id === horse._id) === undefined;

    return this.allHorses.filter(horse => {
      const a = !horse.name.toLowerCase().includes(filterValue);
      const b = d(horse);
      return a && b;
    });
  }

  onAddClick() {
    if (this.form.valid) {
      this.onClose(this.form.value);
    }
  };

  onCancelClick = (): void => {
    this.onClose();
  };

  onClose = (data?: DialogData): void => {
    this.dialogRef.close(data);
  };
}
