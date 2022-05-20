import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { SeatingPlanElement } from '@shared/elements/seating-plan/components/seating-plan-element/seating-plan-element';

@Component({
  selector: 'app-basic-seating-plan-element',
  templateUrl: './basic-seat-group.component.html',
  styleUrls: ['./basic-seat-group.component.scss', '../../shared.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicSeatGroupComponent extends SeatingPlanElement {
  rows = 3;
  columns = 3;

  constructor(dialog: MatDialog) {
    super(dialog);
  }
}
