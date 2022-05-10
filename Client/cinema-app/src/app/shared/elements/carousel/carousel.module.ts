import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CarouselComponent } from '@shared/elements/carousel/carousel.component';
import { CoreModule } from '@core/core.module';

@NgModule({
  declarations: [CarouselComponent],
  exports: [CarouselComponent],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule
  ]
})
export class CarouselModule {
}
