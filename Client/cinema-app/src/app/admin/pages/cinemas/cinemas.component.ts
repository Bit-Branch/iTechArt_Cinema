import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { dialogsConfig } from '@core/configuration/dialogs-config';
import { CinemaDialogComponent } from '@admin/dialogs/cinema-dialog/cinema-dialog.component';

@Component({
  selector: 'app-cinemas',
  template:
    `
      <app-admin-edit-page title="Cinemas">
        <button mat-stroked-button class="btn" (click)="openCreateCinemaDialog()">
          Create new cinema
        </button>
      </app-admin-edit-page>
    `
})
export class CinemasComponent {
  constructor(private readonly dialog: MatDialog) {
  }

  openCreateCinemaDialog(): void {
    this.dialog.open(CinemaDialogComponent, dialogsConfig);
  }
}
