import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { SeatingPlanElement } from '@admin/seating-plan/components/seating-plan-element/seating-plan-element';

@Component({
  selector: 'app-sofa',
  templateUrl: './sofa.component.html',
  styleUrls: ['./sofa.component.scss', '../../shared.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SofaComponent extends SeatingPlanElement {
  seatsCount = 2;

  constructor(dialog: MatDialog) {
    super(dialog);
  }
}
