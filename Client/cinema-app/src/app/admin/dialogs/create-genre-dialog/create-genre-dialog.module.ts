import { CreateGenreDialogComponent } from '@admin/dialogs/create-genre-dialog/create-genre-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    CreateGenreDialogComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDividerModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class CreateGenreDialogModule {
}
