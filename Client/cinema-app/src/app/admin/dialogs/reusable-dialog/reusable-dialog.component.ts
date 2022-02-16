import { Observable } from 'rxjs';

import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { CityService } from '@core/services/city.service';
import { GenreService } from '@core/services/genre.service';
import { SeatTypeService } from '@core/services/seat-type.service';
import { SnackbarService } from '@core/services/snackbar.service';
import {
  CreationPageKeys, creationPageMessages, CreationPageObject
} from '@admin/dialogs/reusable-dialog/reusable-dialog-messages';

@Component({
  selector: 'app-reusable-dialog',
  templateUrl: './reusable-dialog.component.html',
  styleUrls: ['./reusable-dialog.component.scss']
})
export class ReusableDialogComponent {
  page: CreationPageKeys;
  name: FormControl;

  constructor(
    private readonly ref: MatDialogRef<ReusableDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private pageKey: CreationPageKeys,
    private readonly genreService: GenreService,
    private readonly cityService: CityService,
    private readonly seatTypeService: SeatTypeService,
    private readonly snackbarService: SnackbarService
  ) {
    this.name = new FormControl(null, [Validators.required]);
    this.page = pageKey;
  }

  get currentPageContent(): CreationPageObject {
    return creationPageMessages[this.page];
  }

  create(): void {
    let action: Observable<number>;
    switch (this.page) {
      case 'city':
        action = this.cityService.createCity({ name: this.name.value });
        break;
      case 'genre':
        action = this.genreService.createGenre({ name: this.name.value });
        break;
      case 'seatType':
        action = this.seatTypeService.createSeatType({ name: this.name.value });
        break;
    }
    action.subscribe(
      {
        next: (data: number) => {
          this.snackbarService.showSuccessSnackBar(this.currentPageContent.successMessage);
          this.ref.close(data);
        },
        error: (error: HttpErrorResponse) => {
          this.snackbarService.showDangerSnackBar(error.error);
        }
      }
    );
  }

  closeDialog(): void {
    this.ref.close();
  }
}
