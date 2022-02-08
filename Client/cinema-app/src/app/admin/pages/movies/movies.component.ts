import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { dialogsConfig } from '@core/configuration/DialogsConfig';
import { MovieDialogComponent } from '@admin/dialogs/movie-dialog/movie-dialog.component';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent {
  constructor(private readonly dialog: MatDialog) {
  }

  openCreateMovieDialog(): void {
    this.dialog.open(MovieDialogComponent, dialogsConfig);
  }
}
