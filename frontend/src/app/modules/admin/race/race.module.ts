import { NgxMatDatetimePickerModule } from '@angular-material-components/datetime-picker';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';
import { RaceDialogComponent } from '@app/modules/admin/race/race-dialog/race-dialog.component';
import { RaceComponent } from '@app/modules/admin/race/race.component';

const routes: Routes = [
  {
    path: '',
    component: RaceComponent
  }
];

@NgModule({
  declarations: [
    RaceComponent,
    RaceDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatChipsModule,
    NgxMatDatetimePickerModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatInputModule
  ]
})
export class RaceModule {
}
