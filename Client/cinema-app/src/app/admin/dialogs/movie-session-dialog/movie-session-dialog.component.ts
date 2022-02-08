//Angular
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

//Local
import { ValidationPatterns } from '@core/constants/validation-patterns';
import { Cinema } from '@core/models/cinema';
import { Hall } from '@core/models/hall';
import { Movie } from '@core/models/movie';
import { MovieSession } from '@core/models/movie-session';
import { SeatType } from '@core/models/seat-type';
import { TicketPrice } from '@core/models/ticket-price';
import { CinemaService } from '@core/services/cinema.service';
import { HallService } from '@core/services/hall.service';
import { MovieSessionService } from '@core/services/movie-session.service';
import { MovieService } from '@core/services/movie.service';

const cinemaControl = 'cinema';
const hallControl = 'hall';
const movieControl = 'movie';
const showTimeControl = 'showTime';
const favorControl = 'favor';
const seatPriceControl = 'seatPrice';
const seatPricesControl = 'seatPrices';

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
    private readonly cinemaService: CinemaService,
    private readonly hallService: HallService,
    private readonly movieSessionService: MovieSessionService,
    private readonly movieService: MovieService
  ) {
    this.sessionForm = this.fb.group({
      cinema: [null, Validators.required],
      movie: [null, Validators.required],
      hall: [null, Validators.required],
      showTime: [null, Validators.required],
      seatPrices: this.fb.array([])
    });
    this.getAllMovies();
    this.getAllCinemas();
  }

  onSubmit(): void {
    const session: MovieSession = {
      hallId: this.sessionForm.get(hallControl)?.value,
      movieId: this.sessionForm.get(movieControl)?.value,
      ticketPrices: this.ticketPrices,
      showTime: this.sessionForm.get(showTimeControl)?.value
    };
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

  closeDialog(): void {
    this.dialogRef.close();
  }

  fillHalls(): void {
    this.halls = (this.sessionForm.get(cinemaControl)?.value as Cinema).halls;
  }

  fillSeatTypes(): void {
    this.seatTypes = [{ id: 0, name: 'one' }, { id: 1, name: 'two' }];
    this.addTicketPrices();
  }

  addTicketPrices(): void {
    this.seatTypes.forEach(seatType => {
        const seatPriceForm = this.fb.group({
          seatPrice: [null, [Validators.required, Validators.pattern(ValidationPatterns.ONLY_NUMBERS_PATTERN)]]
        });
        this.seatPrices.push(seatPriceForm);
      }
    );
  }

  private getAllMovies(): void {
    this.movieService.getAllMovies()
      .subscribe(
        (movies: Movie[]) => {
          this.movies = movies;
        }
      );
  }

  private getAllCinemas(): void {
    this.cinemaService.getAllCinemas()
      .subscribe(
        (cinemas: Cinema[]) => {
          this.cinemas = cinemas;
        }
      );
  }
}
