import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import {
  CalculateTicketDialogComponent
} from '@client-portal/calculate-ticket-dialog/calculate-ticket-dialog.component';

@NgModule({
  declarations: [CalculateTicketDialogComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class CalculateTicketDialogModule {
}
