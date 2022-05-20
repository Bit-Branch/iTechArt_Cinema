import { EMPTY, switchMap } from 'rxjs';

import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { dialogsConfig } from '@core/configuration/dialogs-config';
import { MovieSession } from '@core/models/movie-session/movie-session';
import { MovieSessionService } from '@core/services/movie-session.service';
import { PaginationResult } from '@core/models/pagination-result/pagination-result';
import { DisplayMovieSession } from '@core/models/movie-session/display-movie-session';
import { MovieSessionDialogComponent } from '@admin/dialogs/movie-session-dialog/movie-session-dialog.component';
import { TableCurrentState } from '@shared/elements/editable-table/interfaces/table-current-state';
import { TableColumn } from '@shared/elements/editable-table/interfaces/table-column';
import { ConfirmDialogComponent } from '@shared/layout/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-movie-sessions',
  templateUrl: './movie-sessions.component.html'
})
export class MovieSessionsComponent implements OnInit {
  movieSessions: PaginationResult<DisplayMovieSession> = { totalCount: 0, items: [] };
  moviesSessionsTableColumns: TableColumn[] = [];

  constructor(
    private readonly dialog: MatDialog,
    private readonly movieSessionService: MovieSessionService
  ) {
  }

  ngOnInit(): void {
    this.initializeColumns();
  }

  openCreateMovieSessionDialog(): void {
    this.dialog.open(MovieSessionDialogComponent, dialogsConfig);
  }

  editMovieSession($event: MovieSession): void {
    const ref = this.dialog.open(MovieSessionDialogComponent, { ...dialogsConfig, data: $event });
    ref.afterClosed()
      .subscribe(
        (data: MovieSession[]) => {
          this.movieSessions =
            {
              totalCount: this.movieSessions.totalCount,
              items: this.movieSessions.items.map(item => item.id === data[0].id ? { ...item, ...data[0] } : item)
            };
        }
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
        (id: number) => {
          this.movieSessions =
            {
              totalCount: --this.movieSessions.totalCount,
              items: this.movieSessions.items.filter(item => item.id !== id)
            }
        }
      );
  }

  getAllMovieSessions(tableCurrentState: TableCurrentState): void {
    this.movieSessionService.getAllMovieSessionsPaged(tableCurrentState)
      .subscribe(
        (value: PaginationResult<DisplayMovieSession>) => this.movieSessions = value
      );
  }

  private initializeColumns(): void {
    this.moviesSessionsTableColumns = [
      {
        name: 'Movie',
        dataKey: 'movieName',
        position: 'left',
        isSortable: true
      },
      {
        name: 'Cinema',
        dataKey: 'cinemaName',
        position: 'left',
        isSortable: true
      },
      {
        name: 'Hall',
        dataKey: 'hallName',
        position: 'left',
        isSortable: true
      },
      {
        name: 'Start showing in',
        dataKey: 'startShowingTime',
        position: 'left',
        isSortable: true,
        pipe: { pipe: DatePipe, pipeArguments: ['medium'] }
      },
      {
        name: 'Ends in',
        dataKey: 'endShowingTime',
        position: 'left',
        isSortable: true,
        pipe: { pipe: DatePipe, pipeArguments: ['medium'] }
      }
    ];
  }
}
