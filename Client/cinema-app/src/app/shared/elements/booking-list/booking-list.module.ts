import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';

import {
  BookingListTimeTooltipModule
} from '@shared/elements/booking-list/booking-list-time-tooltip/booking-list-time-tooltip.module';

import { BookingListComponent } from '@shared/elements/booking-list/booking-list.component';

@NgModule({
  declarations: [BookingListComponent],
  exports: [BookingListComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    MatIconModule,
    MatSelectModule,
    BookingListTimeTooltipModule,
    MatButtonModule
  ]
})
export class BookingListModule {
}
