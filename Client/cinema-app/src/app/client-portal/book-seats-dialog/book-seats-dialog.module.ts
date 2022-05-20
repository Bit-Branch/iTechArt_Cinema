import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { BookSeatsDialogComponent } from '@client-portal/book-seats-dialog/book-seats-dialog.component';
import { SeatingPlanModule } from '@shared/elements/seating-plan/seating-plan.module';

@NgModule({
  declarations: [BookSeatsDialogComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    SeatingPlanModule
  ]
})
export class BookSeatsDialogModule {
}
