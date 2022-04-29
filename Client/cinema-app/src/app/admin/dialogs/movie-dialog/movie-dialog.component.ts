//External components
import { FileInput, FileValidator } from 'ngx-material-file-input';

import { iif, switchMap } from 'rxjs';

//Angular components
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

//Local
import { Movie } from '@core/models/movie/movie';
import { ImageUrls } from '@core/constants/image-urls';
import { Genre } from '@core/models/genre/genre';
import { CreateMovie } from '@core/models/movie/create-movie';
import { UpdateMovie } from '@core/models/movie/update-movie';
import { ValidationPatterns } from '@core/constants/validation-patterns';
import { GenreService } from '@core/services/genre.service';
import { SnackbarService } from '@core/services/snackbar.service';
import { MovieService } from '@core/services/movie.service';
import { yearValidator } from '@core/validators/year-validator';
import { aspectRatioValidator } from '@core/validators/aspect-ratio-validator';
import { CreationDialogComponent } from '@admin/dialogs/creation-dialog/creation-dialog.component';

/* 'size in mb' * 2 ** 20 */
const imageMaxSizeInBytes = 0.5 * 2 ** 20;
const minMovieYearOfIssue = 1888;
const maxMovieYearOfIssue = new Date().getUTCFullYear();
const imageControl = 'image';
const titleControl = 'title';
const descriptionControl = 'description';
const genreControl = 'genre';
const yearOfIssueControl = 'yearOfIssue';
const showtimeRangeControl = 'showtimeRange';
const startControl = 'startDate';
const endControl = 'endDate';
const durationControl = 'durationInMinutes';

@Component({
  selector: 'app-movie-dialog',
  templateUrl: './movie-dialog.component.html',
  styleUrls: ['../dialogs-shared.scss']
})
export class MovieDialogComponent implements OnInit {
  readonly movieForm: FormGroup;
  dialogTitle = 'Create movie';
  actionButtonLabel = 'Create';
  genres: Genre[] = [];
  filteredGenres: Genre[] = [];
  url = ImageUrls.DEFAULT_MOVIE_IMAGE_URL;
  private isInEditMode = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly movieService: MovieService,
    private readonly genreService: GenreService,
    private readonly snackbarService: SnackbarService,
    private readonly dialog: MatDialog,
    private readonly dialogRef: MatDialogRef<MovieDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData: Movie
  ) {
    this.movieForm = this.formBuilder.group({
      [imageControl]: [null, FileValidator.maxContentSize(imageMaxSizeInBytes), aspectRatioValidator(2, 3)],
      [titleControl]: [null, Validators.required],
      [descriptionControl]: [null, Validators.required],
      [genreControl]: [null, Validators.required],
      [yearOfIssueControl]: [
        null,
        [
          Validators.required,
          Validators.pattern(ValidationPatterns.ONLY_NUMBERS_PATTERN),
          yearValidator(minMovieYearOfIssue, maxMovieYearOfIssue)
        ]
      ],
      [showtimeRangeControl]: this.formBuilder.group({
        [startControl]: [null, Validators.required],
        [endControl]: [null, Validators.required]
      }),
      [durationControl]: [null, [Validators.required, Validators.pattern(ValidationPatterns.ONLY_NUMBERS_PATTERN)]]
    });
    if (dialogData) {
      this.isInEditMode = true;
      this.dialogTitle = 'Edit movie';
      this.actionButtonLabel = 'Apply changes';
    }
  }

  ngOnInit(): void {
    this.getAllGenres();
    if (this.isInEditMode) {
      this.fillFormWithData();
    }
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

  get yearOfIssue(): string {
    return yearOfIssueControl;
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
    const ref = this.dialog.open(
      CreationDialogComponent,
      {
        data: {
          action: 'createGenre'
        }
      }
    );
    ref.afterClosed().subscribe(
      (result: { isCreated: boolean, createdEntityId: number }) => {
        if (result.isCreated) {
          this.getAllGenres();
        }
      }
    );
  }

  onSubmit(): void {
    this.isInEditMode ? this.editMovie() : this.createMovie();
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

  closeDialog(movie?: UpdateMovie): void {
    this.dialogRef.close(movie);
  }

  private getAllGenres(): void {
    this.genreService.getAllGenres()
      .subscribe(
        (genres: Genre[]) => this.genres = genres
      );
  }

  private fillFormWithData(): void {
    if (this.dialogData.image) {
      this.movieService.getMovieCover(this.dialogData.image.id)
        .subscribe(
          // set new url, so we can see an image preview in opened window
          (data: { id: number, content: string }) => this.url = data.content
        );
    }
    this.movieForm.get(genreControl)?.setValue(this.dialogData.genre.id);
    this.movieForm.get(titleControl)?.setValue(this.dialogData.title);
    this.movieForm.get(descriptionControl)?.setValue(this.dialogData.description);
    this.movieForm.get(yearOfIssueControl)?.setValue(this.dialogData.yearOfIssue);
    this.movieForm.get(durationControl)?.setValue(this.dialogData.durationInMinutes);
    this.movieForm.get(showtimeRangeControl)?.get(startControl)?.setValue(this.dialogData.showInCinemasStartDate);
    this.movieForm.get(showtimeRangeControl)?.get(endControl)?.setValue(this.dialogData.showInCinemasEndDate);
  }

  private createMovie(): void {
    const movieFormValue = this.movieForm.value;
    const movie: CreateMovie = {
      title: movieFormValue[titleControl],
      description: movieFormValue[descriptionControl],
      genreId: movieFormValue[genreControl],
      yearOfIssue: movieFormValue[yearOfIssueControl],
      showInCinemasStartDate: movieFormValue[showtimeRangeControl][startControl],
      showInCinemasEndDate: movieFormValue[showtimeRangeControl][endControl],
      durationInMinutes: movieFormValue[durationControl]
    };
    const imageFile = (movieFormValue[imageControl] as FileInput)?.files[0];
    const imageData = new FormData();
    imageData.append('content', imageFile);
    iif(
      // if image was not uploaded by user
      () => imageFile === undefined,
      // just save movie entity in database without an image
      this.movieService.createMovie(movie),
      // otherwise, save uploaded image first and then movie with saved image id
      this.movieService.uploadImage(imageData)
        .pipe(
          switchMap(
            (imageId: number) => {
              movie.imageId = imageId;
              return this.movieService.createMovie(movie);
            }
          )
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

  private editMovie(): void {
    const movieFormValue = this.movieForm.value;
    const movie: UpdateMovie = {
      id: this.dialogData.id,
      title: movieFormValue[titleControl],
      description: movieFormValue[descriptionControl],
      genreId: movieFormValue[genreControl],
      yearOfIssue: movieFormValue[yearOfIssueControl],
      imageId: this.dialogData.image?.id,
      showInCinemasStartDate: movieFormValue[showtimeRangeControl][startControl],
      showInCinemasEndDate: movieFormValue[showtimeRangeControl][endControl],
      durationInMinutes: movieFormValue[durationControl]
    };
    const imageFile = (movieFormValue[imageControl] as FileInput)?.files[0];
    const imageData = new FormData();
    if (this.dialogData.image) {
      imageData.append('id', this.dialogData.image.id.toString());
    }
    imageData.append('content', imageFile);
    iif(
      // if image was not uploaded
      () => imageFile === undefined,
      // just update movie entry in database
      this.movieService.updateMovie(movie),
      // otherwise
      iif(
        // if movie doesn't have image entry in database
        () => movie.imageId === undefined,
        // upload new image
        this.movieService.uploadImage(imageData),
        // otherwise, update existing movie image in database
        this.movieService.editImage(imageData)
      )
        // remember saved image id in movie entity
        .pipe(
          switchMap(
            (imageId: number) => {
              movie.imageId = imageId;
              return this.movieService.updateMovie(movie);
            }
          )
        )
    )
      .subscribe(
        {
          error: (error: HttpErrorResponse) => {
            this.snackbarService.showDangerSnackBar(error.error);
          },
          complete: () => {
            this.snackbarService.showSuccessSnackBar('Movie successfully updated');
            this.closeDialog(movie);
          }
        }
      );
  }
}
