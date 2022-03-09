import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { dialogsConfig } from '@core/configuration/dialogs-config';
import { CinemaDialogComponent } from '@admin/dialogs/cinema-dialog/cinema-dialog.component';

@Component({
  selector: 'app-cinemas',
  templateUrl: './cinemas.component.html'
})
export class CinemasComponent {
  constructor(private readonly dialog: MatDialog) {
  }

  openCreateCinemaDialog(): void {
    this.dialog.open(CinemaDialogComponent, dialogsConfig);
  }
}
