import { EMPTY, Observable, switchMap } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { fullScreenDialogsConfig } from '@core/configuration/dialogs-config';
import { MovieSession } from '@core/models/movie-session/movie-session';
import { Cinema } from '@core/models/cinema/cinema';
import { ImageUrls } from '@core/constants/image-urls';
import { Movie } from '@core/models/movie/movie';
import { MovieService } from '@core/services/movie.service';
import { BookSeatsDialogComponent } from '@client-portal/book-seats-dialog/book-seats-dialog.component';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  defaultMovieImageUrl = ImageUrls.DEFAULT_MOVIE_IMAGE_URL;
  currentMovie$: Observable<Movie> | undefined;
  items: { item: Cinema, linkedShowtimeSessions: MovieSession[] }[] = [];

  constructor(
    private readonly movieService: MovieService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.currentMovie$ = this.activatedRoute.paramMap
      .pipe(
        switchMap(
          (params: ParamMap) => {
            const movieId = Number(params.get('id'));
            return movieId ? this.movieService.getMovieById(movieId) : EMPTY
          }
        )
      );
  }

  getMovieShowingDates(movie: Movie): Date[] {
    const startDate = new Date(movie.showInCinemasStartDate)
    const stopDate = new Date(movie.showInCinemasEndDate);
    let dates: Date[] = [];
    while (startDate < stopDate) {
      dates = [...dates, new Date(startDate)]
      startDate.setDate(startDate.getDate() + 1)
    }
    dates = [...dates, new Date(startDate)]
    return dates
  }

  openBookSeatsDialog(): void {
    this.dialog.open(
      BookSeatsDialogComponent,
      fullScreenDialogsConfig
    );
  }
}
