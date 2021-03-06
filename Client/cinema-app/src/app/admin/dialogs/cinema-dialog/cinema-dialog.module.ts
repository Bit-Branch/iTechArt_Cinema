//External modules
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

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
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

//Components
import { CinemaDialogComponent } from '@admin/dialogs/cinema-dialog/cinema-dialog.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [CinemaDialogComponent],
  exports: [CinemaDialogComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    SharedModule,
    MatAutocompleteModule,
    NgxMatSelectSearchModule
  ]
})
export class CinemaDialogModule {
}
