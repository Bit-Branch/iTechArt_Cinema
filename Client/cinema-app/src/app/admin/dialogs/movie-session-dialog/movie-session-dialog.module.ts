//External modules
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

//Angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

//Material modules
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

//Local
import { MovieSessionDialogComponent } from '@admin/dialogs/movie-session-dialog/movie-session-dialog.component';

@NgModule({
  declarations: [
    MovieSessionDialogComponent
  ],
  exports: [
    MovieSessionDialogComponent
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
    NgxMaterialTimepickerModule,
    MatDividerModule
  ]
})
export class MovieSessionDialogModule {
}
