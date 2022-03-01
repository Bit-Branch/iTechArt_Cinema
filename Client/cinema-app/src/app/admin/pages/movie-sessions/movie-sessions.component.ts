import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { dialogsConfig } from '@core/configuration/dialogs-config';
import { MovieSessionDialogComponent } from '@admin/dialogs/movie-session-dialog/movie-session-dialog.component';

@Component({
  selector: 'app-movie-sessions',
  template:
    `
      <app-admin-edit-page title="Movie sessions">
        <button mat-stroked-button class="btn" (click)="openCreateMovieSessionDialog()">
          Create new movie session
        </button>
      </app-admin-edit-page>
    `
})
export class MovieSessionsComponent {
  constructor(private readonly dialog: MatDialog) {
  }

  openCreateMovieSessionDialog(): void {
    this.dialog.open(MovieSessionDialogComponent, dialogsConfig);
  }
}
