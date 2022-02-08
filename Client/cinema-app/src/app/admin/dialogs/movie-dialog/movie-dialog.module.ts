//External modules
import { MaterialFileInputModule } from 'ngx-material-file-input';

//Angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

//Material modules
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

//Components
import { MovieDialogComponent } from './movie-dialog.component';

@NgModule({
  declarations: [
    MovieDialogComponent
  ],
  exports: [
    MovieDialogComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MaterialFileInputModule,
    MatDividerModule,
    MatNativeDateModule
  ]
})
export class MovieDialogModule {
}
