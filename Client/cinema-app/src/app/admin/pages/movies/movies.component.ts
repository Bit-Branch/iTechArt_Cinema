import { EMPTY, switchMap } from 'rxjs';

import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { dialogsConfig } from '@core/configuration/dialogs-config';
import { ImageUrls } from '@core/constants/image-urls';
import { MovieDialogComponent } from '@admin/dialogs/movie-dialog/movie-dialog.component';
import { Movie } from '@core/models/movie/movie';
import { MovieService } from '@core/services/movie.service';
import { MinutesPipe } from '@core/pipes/minutes.pipe';
import { ImageBase64UrlPipe } from '@core/pipes/image-base64-url.pipe';
import { PaginationResult } from '@core/models/pagination-result/pagination-result';
import { TableCurrentState } from '@shared/elements/editable-table/interfaces/table-current-state';
import { TableColumn } from '@shared/elements/editable-table/interfaces/table-column';
import { ConfirmDialogComponent } from '@shared/layout/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html'
})
export class MoviesComponent implements OnInit {
  movies: PaginationResult<Movie> = { totalCount: 0, items: [] };
  moviesTableColumns: TableColumn[] = [];

  constructor(
    private readonly dialog: MatDialog,
    private readonly movieService: MovieService
  ) {
  }

  ngOnInit(): void {
    this.initializeColumns();
  }

  openCreateMovieDialog(): void {
    this.dialog.open(MovieDialogComponent, dialogsConfig);
  }

  editMovie($event: Movie): void {
    const ref = this.dialog.open(MovieDialogComponent, { ...dialogsConfig, data: $event });
    ref.afterClosed()
      .subscribe(
        (data: Movie) => {
          this.movies =
            {
              totalCount: this.movies.totalCount,
              items: this.movies.items.map(item => item.id === data.id ? { ...item, ...data } : item)
            };
        }
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
        (id: number) => {
          this.movies =
            {
              totalCount: --this.movies.totalCount,
              items: this.movies.items.filter(item => item.id !== id)
            }
        }
      );
  }

  getAllMovies(tableCurrentState: TableCurrentState): void {
    this.movieService.getAllMoviesPaged(tableCurrentState)
      .subscribe(
        (value: PaginationResult<Movie>) => this.movies = value
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
        name: 'Cover',
        dataKey: 'image.content',
        position: 'left',
        isNestedKey: true,
        containsImageUrlOrBase64Data: true,
        pipe: { pipe: ImageBase64UrlPipe, pipeArguments: [ImageUrls.DEFAULT_MOVIE_IMAGE_URL] }
      },
      {
        name: 'Year of issue',
        dataKey: 'yearOfIssue',
        position: 'left',
        isSortable: true
      },
      {
        name: 'Genre',
        dataKey: 'genre.name',
        isNestedKey: true,
        defaultValue: 'Genre is not set',
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
        isSortable: true,
        pipe: { pipe: MinutesPipe }
      }
    ];
  }
}
