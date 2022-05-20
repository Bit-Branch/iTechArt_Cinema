import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LoadingSpinnerComponent } from '@shared/elements/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [LoadingSpinnerComponent],
  exports: [LoadingSpinnerComponent],
  imports: [CommonModule, MatProgressSpinnerModule]
})
export class LoadingSpinnerModule {
}
