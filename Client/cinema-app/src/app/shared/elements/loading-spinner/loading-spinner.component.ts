import { Observable } from 'rxjs';

import { Component } from '@angular/core';

import { LoadingService } from '@core/services/loading.service';

type AvailableSpinnerColors = 'primary' | 'accent' | 'warn';
type AvailableSpinnerModes = 'indeterminate' | 'determinate';
const defaultSpinnerDiameterValue = 50;

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent {
  color: AvailableSpinnerColors = 'accent';
  mode: AvailableSpinnerModes = 'indeterminate';
  /**
   * Diameter of the progress circle.
   */
  diameter = defaultSpinnerDiameterValue;
  isLoading$: Observable<boolean>;

  constructor(private readonly loadingService: LoadingService) {
    this.isLoading$ = this.loadingService.isLoading$;
  }
}
