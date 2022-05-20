import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-calculate-ticket-dialog',
  templateUrl: './calculate-ticket-dialog.component.html',
  styleUrls: ['./calculate-ticket-dialog.component.scss']
})
export class CalculateTicketDialogComponent implements OnInit {
  constructor(
    private readonly dialogRef: MatDialogRef<CalculateTicketDialogComponent>
  ) {
  }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  addFavor(): void {
  }

  removeFavor(): void {
  }
}
