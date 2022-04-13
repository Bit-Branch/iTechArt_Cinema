//External components
import { FileInput, FileValidator } from 'ngx-material-file-input';

import { switchMap } from 'rxjs';

//Angular components
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

//Local
import { Movie } from '@core/models/movie/movie';
import { Genre } from '@core/models/genre/genre';
import { CreateMovie } from '@core/models/movie/create-movie';
import { ValidationPatterns } from '@core/constants/validation-patterns';
import { GenreService } from '@core/services/genre.service';
import { SnackbarService } from '@core/services/snackbar.service';
import { MovieService } from '@core/services/movie.service';
import { ImageService } from '@core/services/image.service';
import { aspectRatioValidator } from '@core/validators/aspect-ratio-validator';
import { CreationDialogComponent } from '@admin/dialogs/creation-dialog/creation-dialog.component';

/* 'size in mb' * 2 ** 20 */
const imageMaxSizeInBytes = 0.5 * 2 ** 20;
const imageControl = 'image';
const titleControl = 'title';
const descriptionControl = 'description';
const genreControl = 'genre';
const showtimeRangeControl = 'showtimeRange';
const startControl = 'startDate';
const endControl = 'endDate';
const durationControl = 'durationInMinutes';
const defaultMovieImageUrl = 'assets/movie-cover-default-image.png';
const defaultMovieImageName = 'movie-cover-default-image.png';

@Component({
  selector: 'app-movie-dialog',
  templateUrl: './movie-dialog.component.html',
  styleUrls: ['../dialogs-shared.scss']
})
export class MovieDialogComponent implements OnInit {
  readonly movieForm: FormGroup;
  genres: Genre[] = [];
  filteredGenres: Genre[] = [];
  url = defaultMovieImageUrl;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly movieService: MovieService,
    private readonly genreService: GenreService,
    private readonly snackbarService: SnackbarService,
    private readonly imageService: ImageService,
    private readonly dialog: MatDialog,
    private readonly dialogRef: MatDialogRef<MovieDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData: Movie
  ) {
    this.movieForm = this.formBuilder.group({
      [imageControl]: [null, FileValidator.maxContentSize(imageMaxSizeInBytes), aspectRatioValidator(2, 3)],
      [titleControl]: [null, Validators.required],
      [descriptionControl]: [null, Validators.required],
      [genreControl]: [null, Validators.required],
      [showtimeRangeControl]: this.formBuilder.group({
        [startControl]: [null, Validators.required],
        [endControl]: [null, Validators.required]
      }),
      [durationControl]: [null, [Validators.required, Validators.pattern(ValidationPatterns.ONLY_NUMBERS_PATTERN)]]
    });
  }

  ngOnInit(): void {
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
    return imageControl;
  }

  openCreateGenreDialog(): void {
    const ref = this.dialog.open(CreationDialogComponent, { data: 'genre' });
    ref.afterClosed().subscribe(
      (result: { isCreated: boolean, createdEntityId: number }) => {
        if (result.isCreated) {
          this.getAllGenres();
        }
      }
    );
  }

  async onSubmit(): Promise<void> {
    const imageData = new FormData();
    let imageFile = (this.movieForm.get(imageControl)?.value as FileInput)?.files[0];
    //if image is not uploaded - using default image
    if (!imageFile) {
      imageFile = await this.imageService.getImageFileFromUrl(defaultMovieImageUrl, defaultMovieImageName);
    }
    imageData.append('content', imageFile);
    this.movieService.uploadImage(imageData)
      .pipe(
        switchMap(
          (imageId: number) => {
            const movieFormValue = this.movieForm.value;
            const movie: CreateMovie = {
              title: movieFormValue[titleControl],
              description: movieFormValue[descriptionControl],
              genreId: movieFormValue[genreControl],
              imageId: imageId,
              showInCinemasStartDate: movieFormValue[showtimeRangeControl][startControl],
              showInCinemasEndDate: movieFormValue[showtimeRangeControl][endControl],
              durationInMinutes: movieFormValue[durationControl]
            };
            return this.movieService.createMovie(movie);
          }
        )
      )
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
      reader.onload = async (event: ProgressEvent<FileReader>) => {
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
