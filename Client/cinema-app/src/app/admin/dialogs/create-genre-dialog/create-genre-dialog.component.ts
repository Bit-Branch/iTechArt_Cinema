import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { GenreService } from '@core/services/genre.service';

@Component({
  selector: 'app-create-genre-dialog',
  templateUrl: './create-genre-dialog.component.html'
})
export class CreateGenreDialogComponent {
  name = new FormControl('', Validators.required);

  constructor(
    private readonly ref: MatDialogRef<CreateGenreDialogComponent>,
    private readonly genreService: GenreService
  ) {
  }
  createGenre() {
    this.genreService.createGenre(this.name.value);
  }

  cancel(): void {
    this.ref.close();
  }
}
