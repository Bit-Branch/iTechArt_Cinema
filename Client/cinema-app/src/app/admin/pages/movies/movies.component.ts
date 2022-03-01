import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { dialogsConfig } from '@core/configuration/dialogs-config';
import { MovieDialogComponent } from '@admin/dialogs/movie-dialog/movie-dialog.component';

@Component({
  selector: 'app-movies',
  template:
    `
      <app-admin-edit-page title="Movies">
        <button mat-stroked-button class="btn" (click)="openCreateMovieDialog()">
          Create new movie
        </button>
      </app-admin-edit-page>
    `
})
export class MoviesComponent {
  constructor(private readonly dialog: MatDialog) {
  }

  openCreateMovieDialog(): void {
    this.dialog.open(MovieDialogComponent, dialogsConfig);
  }
}
