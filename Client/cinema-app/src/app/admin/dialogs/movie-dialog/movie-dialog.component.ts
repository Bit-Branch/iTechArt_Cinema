//External components
import { FileInput, FileValidator } from 'ngx-material-file-input';

//Angular components
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

//Local
import { Movie } from '@core/models/movie';
import { Genre } from '@core/models/genre';
import { ImageService } from '@core/services/image.service';
import { ValidationPatterns } from '@core/constants/validation-patterns';
import { GenreService } from '@core/services/genre.service';
import { SnackbarService } from '@core/services/snackbar.service';
import { MovieService } from '@core/services/movie.service';
import { ReusableDialogComponent } from '@admin/dialogs/reusable-dialog/reusable-dialog.component';

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
    private readonly imageService: ImageService,
    private readonly dialog: MatDialog,
    private readonly dialogRef: MatDialogRef<MovieDialogComponent>
  ) {
    this.movieForm = this.formBuilder.group({
      [imageControl]: [null, [Validators.required, FileValidator.maxContentSize(imageMaxSizeInBytes)]],
      [titleControl]: [null, Validators.required],
      [descriptionControl]: [null, Validators.required],
      [genreControl]: [null, Validators.required],
      [showtimeRangeControl]: this.formBuilder.group({
        [startControl]: [null, Validators.required],
        [endControl]: [null, Validators.required]
      }),
      [durationControl]: [null, [Validators.required, Validators.pattern(ValidationPatterns.ONLY_NUMBERS_PATTERN)]]
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
    return imageControl;
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
    const imageData = new FormData();
    imageData.append('content', (this.movieForm.get(imageControl)?.value as FileInput).files[0]);
    this.movieService.uploadImage(imageData)
      .subscribe(
        {
          next: (imageId: number) => {
            const movie: Movie = {
              title: this.movieForm.get(titleControl)?.value,
              description: this.movieForm.get(descriptionControl)?.value,
              genreId: this.movieForm.get(genreControl)?.value,
              imageId: imageId,
              startDate: this.movieForm.get(showtimeRangeControl)?.get(startControl)?.value,
              endDate: this.movieForm.get(showtimeRangeControl)?.get(endControl)?.value,
              durationInMinutes: this.movieForm.get(durationControl)?.value
            };
            this.movieService.createMovie(movie)
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
          },
          error: (error: HttpErrorResponse) => {
            this.snackbarService.showDangerSnackBar(error.error);
          }
        }
      );
  }

  onSelectFile($event: Event): void {
    const image = ($event.target as HTMLInputElement).files?.item(0);
    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (event: ProgressEvent<FileReader>) => {
        this.url = event.target?.result as string;
        this.imageService.checkImageAspectRatio(
          this.url,
          this.movieForm.get(imageControl) as AbstractControl,
          2,
          3
        );
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
