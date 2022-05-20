import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTabsModule } from '@angular/material/tabs';

import { BookSeatsDialogModule } from '@client-portal/book-seats-dialog/book-seats-dialog.module';
import { CalculateTicketDialogModule } from '@client-portal/calculate-ticket-dialog/calculate-ticket-dialog.module';
import { ClientPortalRoutingModule } from '@client-portal/client-portal-routing.module';
import { HomeComponent } from '@client-portal/home/home.component';
import { MovieDetailComponent } from '@client-portal/movie-detail/movie-detail.component';
import {
  PickTicketsCountDialogModule
} from '@client-portal/pick-tickets-count-dialog/pick-tickets-count-dialog.module';
import { CoreModule } from '@core/core.module';
import { BookingListModule } from '@shared/elements/booking-list/booking-list.module';
import { CarouselModule } from '@shared/elements/carousel/carousel.module';

@NgModule({
  declarations: [HomeComponent, MovieDetailComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    CarouselModule,
    ClientPortalRoutingModule,
    CoreModule,
    BookSeatsDialogModule,
    CalculateTicketDialogModule,
    BookingListModule,
    PickTicketsCountDialogModule
  ]
})
export class ClientPortalModule {
}
