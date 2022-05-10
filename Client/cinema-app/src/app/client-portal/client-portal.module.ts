import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTabsModule } from '@angular/material/tabs';

import { ClientPortalRoutingModule } from '@client-portal/client-portal-routing.module';
import { HomeComponent } from '@client-portal/home/home.component';
import { CarouselModule } from '@shared/elements/carousel/carousel.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    CarouselModule,
    ClientPortalRoutingModule,
    SharedModule
  ]
})
export class ClientPortalModule {
}
