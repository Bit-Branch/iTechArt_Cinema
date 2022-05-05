//External
import { EMPTY, switchMap } from 'rxjs';

//Angular
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { MatSelectChange } from '@angular/material/select';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

//Local
import { DisplayMovieSession } from '@core/models/movie-session/display-movie-session';
import { ValidationPatterns } from '@core/constants/validation-patterns';
import { Cinema } from '@core/models/cinema/cinema';
import { Hall } from '@core/models/hall/hall';
import { UpdateMovieSession } from '@core/models/movie-session/update-movie-session';
import { CreateMovieSession } from '@core/models/movie-session/create-movie-session';
import { MovieSession } from '@core/models/movie-session/movie-session';
import { Movie } from '@core/models/movie/movie';
import { SeatType } from '@core/models/seat-type/seat-type';
import { TicketPrice } from '@core/models/ticket-price/ticket-price';
import { CinemaService } from '@core/services/cinema.service';
import { HallService } from '@core/services/hall.service';
import { MovieSessionService } from '@core/services/movie-session.service';
import { MovieService } from '@core/services/movie.service';
import { SeatTypeService } from '@core/services/seat-type.service';
import { SnackbarService } from '@core/services/snackbar.service';
import { convertTimeStringToMinutes } from '@core/utils/convert-time-string-to-minutes';
import { ConfirmDialogComponent } from '@shared/layout/confirm-dialog/confirm-dialog.component';

const cinemaControl = 'cinema';
const hallControl = 'hall';
const movieControl = 'movie';
const showTimeControl = 'showTime';
const seatPriceControl = 'seatPrice';
const seatPricesControl = 'seatPrices';
const datesControl = 'dates';
const createDialogTitle = 'Create movie session';
const editDialogTitle = 'Edit movie session';
const createActionButtonLabel = 'Create';
const editActionButtonLabel = 'Apply changes';
const defaultLocale = 'nu';

@Component({
  selector: 'app-movie-dialog-session',
  templateUrl: './movie-session-dialog.component.html',
  styleUrls: ['../dialogs-shared.scss']
})
export class MovieSessionDialogComponent implements OnInit {
  readonly sessionForm: FormGroup;
  dialogTitle = createDialogTitle;
  actionButtonLabel = createActionButtonLabel;
  movies: Movie[] = [];
  cinemas: Cinema[] = [];
  halls: Hall[] = [];
  seatTypes: SeatType[] = [];
  isInEditMode = false;
  minShowDate: Date | null = null;
  maxShowDate: Date | null = null;
  private selectedMovieDuration = 0;

  constructor(
    private readonly snackbarService: SnackbarService,
    private readonly cinemaService: CinemaService,
    private readonly hallService: HallService,
    private readonly movieSessionService: MovieSessionService,
    private readonly movieService: MovieService,
    private readonly seatTypeService: SeatTypeService,
    private readonly dialogRef: MatDialogRef<MovieSessionDialogComponent>,
    private readonly dialog: MatDialog,
    private readonly fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private dialogData: MovieSession
  ) {
    this.sessionForm = this.fb.group({
      [cinemaControl]: [null, Validators.required],
      [movieControl]: [null, Validators.required],
      [hallControl]: [null, Validators.required],
      [showTimeControl]: [null, Validators.required],
      [seatPricesControl]: this.fb.array([]),
      [datesControl]: [null, Validators.required]
    });
    if (dialogData) {
      this.isInEditMode = true;
      this.dialogTitle = editDialogTitle;
      this.actionButtonLabel = editActionButtonLabel;
    }
  }

  ngOnInit(): void {
    if (this.isInEditMode) {
      this.fillFormWithData();
    }
  }

  get seatPrices(): FormArray {
    return this.sessionForm.get(seatPricesControl) as FormArray;
  }

  get seatPricesForms(): FormGroup[] {
    return (this.sessionForm.get(seatPricesControl) as FormArray).controls as FormGroup[];
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

  get showTimeControl(): string {
    return showTimeControl;
  }

  get ticketPriceControl(): string {
    return seatPriceControl;
  }

  get datesControl(): string {
    return datesControl;
  }

  closeDialog(movieSessions?: UpdateMovieSession[]): void {
    this.dialogRef.close(movieSessions);
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
          this.fillSeatTypesArray();
        }
      );
  }

  onSubmit(): void {
    this.isInEditMode ? this.editMovieSession() : this.createMovieSession();
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

  OnMovieSelected($event: MatSelectChange): void {
    const selectedMovie = this.movies.find(movie => movie.id === $event.value as number)!;
    this.selectedMovieDuration = selectedMovie.durationInMinutes;
    this.minShowDate = selectedMovie.showInCinemasStartDate;
    this.maxShowDate = selectedMovie.showInCinemasEndDate;
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

  private getTicketPrices(): TicketPrice[] {
    const ticketPrices: TicketPrice[] = [];
    this.seatTypes.forEach(
      (seatType: SeatType, index: number) => {
        const ticketPrice: TicketPrice = {
          seatType: seatType,
          movieSessionId: this.dialogData?.id ?? 0,
          seatTypeId: seatType.id,
          price: this.seatPrices.at(index)?.get(seatPriceControl)?.value
        };
        ticketPrices.push(ticketPrice);
      }
    )
    return ticketPrices;
  }

  private fillFormWithData(): void {
    this.movieService.getMovieById(this.dialogData.movieId)
      .subscribe(
        (movie: Movie) => {
          this.movies.push(movie);
          this.minShowDate = movie.showInCinemasStartDate;
          this.maxShowDate = movie.showInCinemasEndDate;
        }
      );
    this.hallService.getHallById(this.dialogData.hallId)
      .pipe(
        switchMap(
          (hall: Hall) => {
            this.halls.push(hall);
            return this.cinemaService.getCinemaById(hall.cinemaId);
          }
        ),
        switchMap(
          (cinema: Cinema) => {
            this.cinemas.push(cinema);
            this.sessionForm.get(cinemaControl)?.setValue(cinema.id);
            return this.seatTypeService.findAllByHallId(this.dialogData.hallId);
          }
        )
      )
      .subscribe(
        (seatTypes: SeatType[]) => {
          this.seatTypes = seatTypes;
          this.fillSeatPricesWithData(this.dialogData.ticketPrices);
        }
      );
    this.sessionForm.get(movieControl)?.setValue(this.dialogData.movieId);
    this.sessionForm.get(hallControl)?.setValue(this.dialogData.hallId);
    this.sessionForm.get(showTimeControl)?.setValue(this.dialogData.startShowingTime.toLocaleTimeString(defaultLocale));
    this.sessionForm.get(datesControl)?.setValue([this.dialogData.startShowingTime]);
  }

  private fillSeatPricesWithData(ticketPrices: TicketPrice[]): void {
    ticketPrices.forEach(ticketPrice => {
      const seatPriceForm = this.fb.group({
        [seatPriceControl]: [null, [Validators.required, Validators.pattern(ValidationPatterns.ONLY_NUMBERS_PATTERN)]]
      });
      this.seatPrices.push(seatPriceForm);
      seatPriceForm.patchValue({
        [seatPriceControl]: ticketPrice.price
      });
    });
  }

  private createMovieSession(): void {
    const movieSessions: CreateMovieSession[] = [];
    const sessionFormValue = this.sessionForm.value;
    const startTime = sessionFormValue[showTimeControl];
    const startTimeMinutes = convertTimeStringToMinutes(startTime);
    sessionFormValue[datesControl].forEach(
      (chosenShowDate: Date) => {
        movieSessions.push(
          {
            movieId: sessionFormValue[movieControl],
            hallId: sessionFormValue[hallControl],
            startShowingTime: new Date(chosenShowDate.setMinutes(startTimeMinutes)),
            endShowingTime: new Date(chosenShowDate.setMinutes(startTimeMinutes + (this.selectedMovieDuration ?? 0))),
            ticketPrices: this.getTicketPrices()
          }
        );
      }
    );
    this.movieSessionService.findAllConflicted(movieSessions)
      .pipe(
        switchMap(
          (allConflicted: DisplayMovieSession[]) => {
            if (allConflicted) {
              this.showConflictedSessionsErrorDialog(allConflicted);
              return EMPTY;
            }
            return this.movieSessionService.createMovieSessions(movieSessions)
          }
        )
      )
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

  private editMovieSession(): void {
    const movieSessions: UpdateMovieSession[] = [];
    const sessionFormValue = this.sessionForm.value;
    const startTime = sessionFormValue[showTimeControl];
    const startTimeMinutes = convertTimeStringToMinutes(startTime);
    sessionFormValue[datesControl].forEach(
      (chosenShowDate: Date) => {
        movieSessions.push(
          {
            id: this.dialogData.id,
            movieId: sessionFormValue[movieControl],
            hallId: sessionFormValue[hallControl],
            startShowingTime: new Date(chosenShowDate.setMinutes(startTimeMinutes)),
            endShowingTime: new Date(chosenShowDate.setMinutes(startTimeMinutes + (this.selectedMovieDuration ?? 0))),
            ticketPrices: this.getTicketPrices()
          }
        );
      }
    );
    this.movieSessionService.findAllConflicted(movieSessions)
      .pipe(
        switchMap(
          (allConflicted: DisplayMovieSession[]) => {
            if (allConflicted) {
              this.showConflictedSessionsErrorDialog(allConflicted);
              return EMPTY;
            }
            return this.movieSessionService.updateMovieSessions(movieSessions)
          }
        )
      )
      .subscribe(
        {
          error: (error: HttpErrorResponse) => {
            this.snackbarService.showDangerSnackBar(error.error);
          },
          complete: () => {
            this.snackbarService.showSuccessSnackBar('Movie session was successfully updated');
            this.closeDialog();
          }
        }
      );
  }

  private showConflictedSessionsErrorDialog(allConflicted: DisplayMovieSession[]): void {
    let errorMessage = '';
    allConflicted.forEach(
      (movieSession: DisplayMovieSession) =>
        errorMessage += `Movie: ${movieSession.movieName},
        Cinema: ${movieSession.cinemaName},
        Hall: ${movieSession.hallName},
        Start in: ${movieSession.startShowingTime.toLocaleString()},
        End in: ${movieSession.endShowingTime.toLocaleString()}`
    );
    this.dialog.open(
      ConfirmDialogComponent,
      {
        data: {
          title: 'Unable to create/update movie sessions, because there are some conflicted sessions: ',
          message: errorMessage
        }
      }
    )
  }
}
