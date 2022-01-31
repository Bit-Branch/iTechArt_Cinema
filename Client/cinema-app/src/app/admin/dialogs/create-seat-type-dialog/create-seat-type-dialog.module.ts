import {
  CreateSeatTypeDialogComponent
} from '@admin/dialogs/create-seat-type-dialog/create-seat-type-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    CreateSeatTypeDialogComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDividerModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class CreateSeatTypeDialogModule {
}
