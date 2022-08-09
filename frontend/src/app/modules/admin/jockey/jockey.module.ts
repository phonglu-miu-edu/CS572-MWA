import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';
import { JockeyDialogComponent } from '@app/modules/admin/jockey/jockey-dialog/jockey-dialog.component';
import { JockeyComponent } from '@app/modules/admin/jockey/jockey.component';

const routes: Routes = [
  {
    path: '',
    component: JockeyComponent
  }
];

@NgModule({
  declarations: [
    JockeyComponent,
    JockeyDialogComponent
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
    MatInputModule
  ]
})
export class JockeyModule {
}
