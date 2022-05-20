import { Component, Input } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { SeatingPlanElement } from '@shared/elements/seating-plan/components/seating-plan-element/seating-plan-element';

@Component({
  selector: 'app-cinema-screen',
  templateUrl: './cinema-screen.component.html',
  styleUrls: ['./cinema-screen.component.scss', '../../shared.css']
})
export class CinemaScreenComponent extends SeatingPlanElement {
  @Input() screenLabel = 'All eyes this way please!';

  constructor(dialog: MatDialog) {
    super(dialog);
  }
}
