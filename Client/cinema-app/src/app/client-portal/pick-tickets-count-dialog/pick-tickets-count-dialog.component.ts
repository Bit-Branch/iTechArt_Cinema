import { Component } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

import { MAX_BOOK_TICKETS_COUNT } from '@core/constants/max-book-tickets-count';

const howManyTicketsToBookTitle = 'How many tickets you want to book?';

@Component({
  selector: 'app-pick-tickets-count-dialog',
  templateUrl: './pick-tickets-count-dialog.component.html',
  styleUrls: ['./pick-tickets-count-dialog.component.scss']
})
export class PickTicketsCountDialogComponent {
  dialogTitle = howManyTicketsToBookTitle;

  get maxTicketsCount(): number[] {
    return Array.from({ length: MAX_BOOK_TICKETS_COUNT }, (_, i) => i + 1);
  }

  constructor(
    private readonly dialogRef: MatDialogRef<PickTicketsCountDialogComponent>
  ) {
  }

  pickTicketsCount(count: number): void {
    this.dialogRef.close(count);
  }
}
