import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import {
  PickTicketsCountDialogComponent
} from '@client-portal/pick-tickets-count-dialog/pick-tickets-count-dialog.component';

@NgModule({
  declarations: [PickTicketsCountDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class PickTicketsCountDialogModule {
}
