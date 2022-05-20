import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  BookingListTimeTooltipComponent
} from '@shared/elements/booking-list/booking-list-time-tooltip/booking-list-time-tooltip.component';
import {
  BookingListTimeTooltipDirective
} from '@shared/elements/booking-list/booking-list-time-tooltip/booking-list-time-tooltip.directive';

@NgModule({
  declarations: [BookingListTimeTooltipComponent, BookingListTimeTooltipDirective],
  exports: [
    BookingListTimeTooltipDirective
  ],
  imports: [
    CommonModule
  ]
})
export class BookingListTimeTooltipModule {
}
