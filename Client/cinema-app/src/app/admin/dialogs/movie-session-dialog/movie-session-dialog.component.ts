//Angular
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatSelectChange } from '@angular/material/select';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

//Local
import { ValidationPatterns } from '@core/constants/validation-patterns';
import { Cinema } from '@core/models/cinema';
import { Hall } from '@core/models/hall';
import { Movie } from '@core/models/movie';
import { MovieSession } from '@core/models/movie-session';
import { MovieSessionDate } from '@core/models/movie-session-date';
import { SeatType } from '@core/models/seat-type';
import { TicketPrice } from '@core/models/ticket-price';
import { CinemaService } from '@core/services/cinema.service';
import { HallService } from '@core/services/hall.service';
import { MovieSessionService } from '@core/services/movie-session.service';
import { MovieService } from '@core/services/movie.service';
import { SeatTypeService } from '@core/services/seat-type.service';
import { SnackbarService } from '@core/services/snackbar.service';

const cinemaControl = 'cinema';
const hallControl = 'hall';
const movieControl = 'movie';
const showTimeControl = 'showTime';
const favorControl = 'favor';
const seatPriceControl = 'seatPrice';
const seatPricesControl = 'seatPrices';
const datesControl = 'dates';

@Component({
  selector: 'app-movie-dialog-session',
  templateUrl: './movie-session-dialog.component.html',
  styleUrls: ['./movie-session-dialog.component.scss']
})
export class MovieSessionDialogComponent {
  movies: Movie[] = [];
  cinemas: Cinema[] = [];
  halls: Hall[] = [];
  ticketPrices: TicketPrice[] = [];
  seatTypes: SeatType[] = [];
  sessionForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<MovieSessionDialogComponent>,
    private readonly dialog: MatDialog,
    private readonly snackbarService: SnackbarService,
    private readonly cinemaService: CinemaService,
    private readonly hallService: HallService,
    private readonly movieSessionService: MovieSessionService,
    private readonly movieService: MovieService,
    private readonly seatTypeService: SeatTypeService
  ) {
    this.sessionForm = this.fb.group({
      [cinemaControl]: [null, Validators.required],
      [movieControl]: [null, Validators.required],
      [hallControl]: [null, Validators.required],
      [showTimeControl]: [null, Validators.required],
      [seatPricesControl]: this.fb.array([]),
      [datesControl]: [null, Validators.required]
    });
  }

  get seatPrices(): FormArray {
    return this.sessionForm.get(seatPricesControl) as FormArray;
  }

  get movieControl(): string {
    return movieControl;
  }

  get cinemaControl(): string {
    return cinemaControl;
  }

  get hallControl(): string {
    return hallControl;
  }

  get favorControl(): string {
    return favorControl;
  }

  get showTimeControl(): string {
    return showTimeControl;
  }

  get ticketPriceControl(): string {
    return seatPriceControl;
  }

  get datesControl(): string {
    return datesControl;
  }

  get selectedMovie(): Movie | null {
    return this.sessionForm.get(movieControl)?.value as Movie;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onCinemaSelected($event: MatSelectChange): void {
    this.hallService.findAllByCinemaId($event.value)
      .subscribe(
        (halls: Hall[]) => {
          this.halls = halls;
        }
      );
  }

  onHallSelected($event: MatSelectChange): void {
    this.seatTypeService.findAllByHallId($event.value)
      .subscribe(
        (seatTypes: SeatType[]) => {
          this.seatTypes = seatTypes;
        }
      );
    this.fillSeatTypesArray();
  }

  onSubmit(): void {
    const session: MovieSession = {
      movieId: this.sessionForm.get(movieControl)?.value,
      hallId: this.sessionForm.get(hallControl)?.value,
      ticketPrices: this.ticketPrices,
      showTime: this.sessionForm.get(showTimeControl)?.value,
      movieSessionDates: this.convertPickedDatesToMovieSessionDates()
    };
    this.movieSessionService.createMovieSession(session)
      .subscribe(
        {
          error: (error: HttpErrorResponse) => {
            this.snackbarService.showDangerSnackBar(error.error);
          },
          complete: () => {
            this.snackbarService.showSuccessSnackBar('Movie session was successfully created');
            this.closeDialog();
          }
        }
      );
  }

  onSearchMovies(event: Event): void {
    const value = (event.target as HTMLInputElement)?.value;
    this.movieService.findAllBySearchTerm(value)
      .subscribe(
        (movies: Movie[]) => {
          this.movies = movies;
        }
      );
  }

  onSearchCinemas(event: Event): void {
    const value = (event.target as HTMLInputElement)?.value;
    this.cinemaService.findAllBySearchTerm(value)
      .subscribe(
        (cinemas: Cinema[]) => {
          this.cinemas = cinemas;
        }
      );
  }

  private fillSeatTypesArray(): void {
    this.seatTypes.forEach(_ => {
        const seatPriceForm = this.fb.group({
          [seatPriceControl]: [null, [Validators.required, Validators.pattern(ValidationPatterns.ONLY_NUMBERS_PATTERN)]]
        });
        this.seatPrices.push(seatPriceForm);
      }
    );
  }

  private convertPickedDatesToMovieSessionDates(): MovieSessionDate[] {
    const movieSessionDates: MovieSessionDate[] = [];
    this.sessionForm.get(datesControl)?.value.forEach(
      (value: Date) => {
        const movieSessionDate: MovieSessionDate = {
          showDate: value
        };
        movieSessionDates.push(movieSessionDate);
      });
    return movieSessionDates;
  }
}
