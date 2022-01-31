import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { GenreService } from '@core/services/genre.service';

@Component({
  selector: 'app-create-seat-type-dialog',
  templateUrl: './create-seat-type-dialog.component.html'
})
export class CreateSeatTypeDialogComponent {
  name = new FormControl('', Validators.required);

  constructor(
    private readonly ref: MatDialogRef<CreateSeatTypeDialogComponent>,
    private readonly genreService: GenreService
  ) {
  }
  createGenre() {
    this.genreService.updateGenre(this.name.value);
  }

  cancel(): void {
    this.ref.close();
  }

}
