import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { dialogsConfig } from '@core/configuration/dialogs-config';
import { MovieSessionDialogComponent } from '@admin/dialogs/movie-session-dialog/movie-session-dialog.component';

@Component({
  selector: 'app-movie-sessions',
  templateUrl: './movie-sessions.component.html'
})
export class MovieSessionsComponent {
  constructor(private readonly dialog: MatDialog) {
  }

  openCreateMovieSessionDialog(): void {
    this.dialog.open(MovieSessionDialogComponent, dialogsConfig);
  }
}
