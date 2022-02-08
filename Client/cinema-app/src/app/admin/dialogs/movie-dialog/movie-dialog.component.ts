//External components
import { FileInput, FileValidator } from 'ngx-material-file-input';

//Angular components
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

//Local
import { Movie } from '@core/models/movie';
import { Genre } from '@core/models/genre';
import { ValidationPatterns } from '@core/constants/validation-patterns';
import { GenreService } from '@core/services/genre.service';
import { SnackbarService } from '@core/services/snackbar.service';
import { MovieService } from '@core/services/movie.service';
import { ReusableDialogComponent } from '@admin/dialogs/reusable-dialog/reusable-dialog.component';

/* 'size in mb' * 2 ** 20 */
const imageMaxSizeInBytes = 0.5 * 2 ** 20;
const coverControl = 'cover';
const titleControl = 'title';
const descriptionControl = 'description';
const genreControl = 'genre';
const showtimeRangeControl = 'showtimeRange';
const startControl = 'startDate';
const endControl = 'endDate';
const durationControl = 'durationInMinutes';
const movieCoverProperty: keyof Movie = 'cover';
const movieTitleProperty: keyof Movie = 'title';
const movieDescriptionProperty: keyof Movie = 'description';
const movieGenreIdProperty: keyof Movie = 'genreId';
const movieStartDateProperty: keyof Movie = 'startDate';
const movieEndDateProperty: keyof Movie = 'endDate';
const movieDurationProperty: keyof Movie = 'durationInMinutes';

@Component({
  selector: 'app-movie-dialog',
  templateUrl: './movie-dialog.component.html',
  styleUrls: ['./movie-dialog.component.scss']
})
export class MovieDialogComponent {
  genres: Genre[] = [];
  filteredGenres: Genre[] = [];
  movieForm: FormGroup;
  url = '';

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly movieService: MovieService,
    private readonly genreService: GenreService,
    private readonly snackbarService: SnackbarService,
    private readonly dialog: MatDialog,
    private readonly dialogRef: MatDialogRef<MovieDialogComponent>
  ) {
    this.movieForm = this.formBuilder.group({
      cover: [null, [Validators.required, FileValidator.maxContentSize(imageMaxSizeInBytes)]],
      title: [null, Validators.required],
      description: [null, Validators.required],
      genre: [null, Validators.required],
      showtimeRange: this.formBuilder.group({
        startDate: [null, Validators.required],
        endDate: [null, Validators.required]
      }),
      durationInMinutes: [null, [Validators.required, Validators.pattern(ValidationPatterns.ONLY_NUMBERS_PATTERN)]]
    });
    this.getAllGenres();
  }

  get showtimeRange(): FormGroup {
    return this.movieForm.get(showtimeRangeControl) as FormGroup;
  }

  get titleControl(): string {
    return titleControl;
  }

  get descriptionControl(): string {
    return descriptionControl;
  }

  get genreControl(): string {
    return genreControl;
  }

  get showtimeRangeControl(): string {
    return showtimeRangeControl;
  }

  get startControl(): string {
    return startControl;
  }

  get endControl(): string {
    return endControl;
  }

  get durationControl(): string {
    return durationControl;
  }

  get coverControl(): string {
    return coverControl;
  }

  openCreateGenreDialog(): void {
    const ref = this.dialog.open(ReusableDialogComponent, { data: 'genre' });
    ref.afterClosed().subscribe(
      (data: number) => {
        if (data) {
          this.getAllGenres();
        }
      }
    );
  }

  onSubmit(): void {
    const movieData = new FormData();
    movieData.append(movieTitleProperty, this.movieForm.get(titleControl)?.value);
    movieData.append(movieDescriptionProperty, this.movieForm.get(descriptionControl)?.value);
    movieData.append(movieGenreIdProperty, this.movieForm.get(genreControl)?.value);
    movieData.append(
      movieStartDateProperty,
      (this.movieForm.get(showtimeRangeControl)?.get(startControl)?.value as Date).toDateString()
    );
    movieData.append(
      movieEndDateProperty,
      (this.movieForm.get(showtimeRangeControl)?.get(endControl)?.value as Date).toDateString()
    );
    movieData.append(movieDurationProperty, this.movieForm.get(durationControl)?.value);
    movieData.append(movieCoverProperty, (this.movieForm.get(coverControl)?.value as FileInput).files[0]);

    this.movieService.createMovie(movieData)
      .subscribe(
        {
          error: (error: HttpErrorResponse) => {
            this.snackbarService.showDangerSnackBar(error.error);
          },
          complete: () => {
            this.snackbarService.showSuccessSnackBar('Movie successfully created');
            this.closeDialog();
          }
        }
      );
  }

  onSelectFile($event: Event): void {
    const image = ($event.target as HTMLInputElement).files?.item(0);
    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (event) => {
        this.url = event.target?.result as string;
      };
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  private getAllGenres(): void {
    this.genreService.getAllGenres()
      .subscribe(
        (genres: Genre[]) => {
          this.genres = genres;
        }
      );
  }
}
