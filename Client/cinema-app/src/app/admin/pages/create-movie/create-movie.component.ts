//External components
import { CreateGenreDialogComponent } from '@admin/dialogs/create-genre-dialog/create-genre-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Genre } from '@core/models/genre';
import { GenreService } from '@core/services/genre.service';
import { SnackbarService } from '@core/services/snackbar.service';
import { FileInput, FileValidator } from 'ngx-material-file-input';

//Angular components
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

//Local components
import { Movie } from '@core/models/movie';
import { ImageService } from '@core/services/image.service';
import { MovieService } from '@core/services/movie.service';

//'size in mb' * 2 ** 20
const imageMaxSizeInBytes = 5 * 2 ** 20;
const onlyNumbersPattern = /^[0-9]*$/;
const coverControl = 'cover';
const titleControl = 'title';
const descriptionControl = 'description';
const genreControl = 'genre';
const showtimeRangeControl = 'showtimeRange';
const startControl = 'start';
const endControl = 'end';
const durationControl = 'duration';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.scss']
})
export class CreateMovieComponent {
  genres: Genre[] = [];
  movieForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly movieService: MovieService,
    private readonly genreService: GenreService,
    private readonly imageService: ImageService,
    private readonly snackbarService: SnackbarService,
    private readonly dialog: MatDialog
  ) {
    this.movieForm = this.formBuilder.group({
      cover: [null, FileValidator.maxContentSize(imageMaxSizeInBytes)],
      title: [null, Validators.required],
      description: [null, Validators.required],
      genre: [null, Validators.required],
      showtimeRange: this.formBuilder.group({
        start: [null, Validators.required],
        end: [null, Validators.required]
      }),
      duration: [null, [Validators.required, Validators.pattern(onlyNumbersPattern)]]
    });
    this.genres = [{ id: 1, name: 'Action' }];
    /*this.genreService.getAllGenres()
      .subscribe(
        (genres: Genre[]) => {
          this.genres = genres;
        }
      );*/
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

  async onSubmit(): Promise<void> {
    const movie: Movie = {
      title: this.movieForm.get(titleControl)?.value as string,
      description: this.movieForm.get(descriptionControl)?.value as string,
      genre: this.movieForm.get(genreControl)?.value as string,
      startDate: this.movieForm.get(showtimeRangeControl)?.get(startControl)?.value as Date,
      endDate: this.movieForm.get(showtimeRangeControl)?.get(endControl)?.value as Date,
      durationInMinutes: this.movieForm.get(durationControl)?.value as number
    };

    const image: File = (this.movieForm.get(coverControl)?.value as FileInput)?.files[0];

    console.log(image);

    if (image) {
      const imageBytes: Uint8Array = await this.imageService.convertFileToByteArray(image);
      //movie.cover = btoa(String.fromCharCode(...imageBytes))
      movie.cover = imageBytes;
    //  movie.cover = btoa(new TextDecoder('utf8').decode(imageBytes));
    }

    console.log(movie);

    this.movieService.createMovie(movie)
      .subscribe(
        {
          error: (error: HttpErrorResponse) => {
            this.snackbarService.showDangerSnackBar(error.error);
          },
          complete: () => {
            this.snackbarService.showSuccessSnackBar('Movie successfully created');
          }
        }
      );
  }

  openCreateGenreDialog(): void {
    this.dialog.open(CreateGenreDialogComponent);
  }
}
