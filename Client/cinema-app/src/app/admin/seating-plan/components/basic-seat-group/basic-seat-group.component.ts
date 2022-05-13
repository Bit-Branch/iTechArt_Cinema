import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { SeatingPlanElement } from '@admin/seating-plan/components/seating-plan-element/seating-plan-element';

const defaultNumberOfRows = 3;
const defaultNumberOfColumns = 3;

@Component({
  selector: 'app-basic-seating-plan-element',
  templateUrl: './basic-seat-group.component.html',
  styleUrls: ['./basic-seat-group.component.scss', '../../shared.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicSeatGroupComponent extends SeatingPlanElement {
  rows = defaultNumberOfRows;
  columns = defaultNumberOfColumns;

  constructor(dialog: MatDialog) {
    super(dialog);
  }
}
