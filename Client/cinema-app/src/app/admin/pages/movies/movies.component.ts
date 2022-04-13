import { EMPTY, switchMap } from 'rxjs';

import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { dialogsConfig } from '@core/configuration/dialogs-config';
import { MovieDialogComponent } from '@admin/dialogs/movie-dialog/movie-dialog.component';
import { Movie } from '@core/models/movie/movie';
import { MovieService } from '@core/services/movie.service';
import { TableColumn } from '@shared/elements/editable-table/interfaces/table-column';
import { ConfirmDialogComponent } from '@shared/layout/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html'
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  moviesTableColumns: TableColumn[] = [];

  constructor(
    private readonly dialog: MatDialog,
    private readonly movieService: MovieService
  ) {
  }

  ngOnInit(): void {
    this.initializeColumns();
    this.getAllMovies();
  }

  openCreateMovieDialog(): void {
    this.dialog.open(MovieDialogComponent, dialogsConfig);
  }

  editMovie($event: Movie): void {
    const ref = this.dialog.open(MovieDialogComponent, { ...dialogsConfig, data: $event });
    ref.afterClosed()
      .subscribe(
        (data: Movie) => this.getAllMovies()
      );
  }

  deleteMovie($event: Movie): void {
    const dialogRef = this.dialog.open(
      ConfirmDialogComponent,
      {
        data: {
          title: 'Are you sure?',
          message: 'Do you really want to delete this movie?'
        }
      }
    );
    dialogRef.afterClosed()
      .pipe(
        switchMap(
          (isSubmitted: boolean) => {
            return isSubmitted ? this.movieService.deleteMovie($event.id) : EMPTY;
          }
        )
      )
      .subscribe(
        (id: number) => this.getAllMovies()
      );
  }

  private getAllMovies(): void {
    this.movieService.getAllMovies()
      .subscribe(
        movies => this.movies = movies
      );
  }

  private initializeColumns(): void {
    this.moviesTableColumns = [
      {
        name: 'Movie title',
        dataKey: 'title',
        position: 'left',
        isSortable: true
      },
      {
        name: 'Genre',
        dataKey: 'genre.name',
        isNestedKey: true,
        position: 'left',
        isSortable: true
      },
      {
        name: 'Start in cinemas',
        dataKey: 'showInCinemasStartDate',
        position: 'right',
        isSortable: true,
        pipe: { pipe: DatePipe }
      },
      {
        name: 'End',
        dataKey: 'showInCinemasEndDate',
        position: 'right',
        isSortable: true,
        pipe: { pipe: DatePipe }
      },
      {
        name: 'Movie duration',
        dataKey: 'durationInMinutes',
        position: 'right',
        isSortable: true
      }
    ];
  }
}
