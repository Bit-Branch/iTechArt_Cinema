import { EMPTY, switchMap } from 'rxjs';

import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { dialogsConfig } from '@core/configuration/dialogs-config';
import { MovieSession } from '@core/models/movie-session/movie-session';
import { MovieSessionService } from '@core/services/movie-session.service';
import { MovieSessionDialogComponent } from '@admin/dialogs/movie-session-dialog/movie-session-dialog.component';
import { TableColumn } from '@shared/elements/editable-table/interfaces/table-column';
import { ConfirmDialogComponent } from '@shared/layout/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-movie-sessions',
  templateUrl: './movie-sessions.component.html'
})
export class MovieSessionsComponent implements OnInit {
  movieSessions: MovieSession[] = [];
  moviesSessionsTableColumns: TableColumn[] = [];

  constructor(
    private readonly dialog: MatDialog,
    private readonly movieSessionService: MovieSessionService
  ) {
  }

  ngOnInit(): void {
    this.initializeColumns();
    this.getAllMovieSessions();
  }

  openCreateMovieSessionDialog(): void {
    this.dialog.open(MovieSessionDialogComponent, dialogsConfig);
  }

  editMovieSession($event: MovieSession): void {
    const ref = this.dialog.open(MovieSessionDialogComponent, { ...dialogsConfig, data: $event });
    ref.afterClosed()
      .subscribe(
        (data: MovieSession) => this.getAllMovieSessions()
      );
  }

  deleteMovieSession($event: MovieSession): void {
    const dialogRef = this.dialog.open(
      ConfirmDialogComponent,
      {
        data: {
          title: 'Are you sure?',
          message: 'Do you really want to delete this movie session?'
        }
      }
    );
    dialogRef.afterClosed()
      .pipe(
        switchMap(
          (isSubmitted: boolean) => {
            return isSubmitted ? this.movieSessionService.deleteMovieSession($event.id) : EMPTY;
          }
        )
      )
      .subscribe(
        (id: number) => this.getAllMovieSessions()
      );
  }

  private getAllMovieSessions(): void {
    this.movieSessionService.getAllMovieSessions()
      .subscribe(
        movieSessions => this.movieSessions = movieSessions
      );
  }

  private initializeColumns(): void {
    this.moviesSessionsTableColumns = [
      {
        name: 'Movie',
        dataKey: 'movie.title',
        isNestedKey: true,
        position: 'left',
        isSortable: true
      },
      {
        name: 'Cinema',
        dataKey: 'hall.cinema.name',
        isNestedKey: true,
        position: 'left',
        isSortable: true
      },
      {
        name: 'Show time',
        dataKey: 'showTime',
        position: 'left',
        isSortable: true
      },
      {
        name: 'Show date',
        dataKey: 'showDate',
        position: 'left',
        isSortable: true
      }
    ];
  }
}
