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
  CreationPageKeys, creationPageMessages, CreationPageElements
} from '@admin/dialogs/creation-dialog/creation-dialog-messages';

@Component({
  selector: 'app-creation-dialog',
  templateUrl: './creation-dialog.component.html',
  styleUrls: ['../dialogs-shared.scss']
})
export class CreationDialogComponent {
  readonly nameControl: FormControl;
  page: CreationPageKeys;

  constructor(
    private readonly genreService: GenreService,
    private readonly cityService: CityService,
    private readonly seatTypeService: SeatTypeService,
    private readonly snackbarService: SnackbarService,
    private readonly ref: MatDialogRef<CreationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private pageKey: CreationPageKeys
  ) {
    this.nameControl = new FormControl(null, [Validators.required]);
    this.page = pageKey;
  }

  get currentPageContent(): CreationPageElements {
    return creationPageMessages[this.page];
  }

  create(): void {
    let action: Observable<number>;
    switch (this.page) {
      case 'city':
        action = this.cityService.createCity({ name: this.nameControl.value });
        break;
      case 'genre':
        action = this.genreService.createGenre({ name: this.nameControl.value });
        break;
      case 'seatType':
        action = this.seatTypeService.createSeatType({ name: this.nameControl.value });
        break;
    }
    action.subscribe(
      {
        next: (createdEntityId: number) => {
          this.snackbarService.showSuccessSnackBar(this.currentPageContent.successMessage);
          this.ref.close({ isCreated: true, createdEntityId: createdEntityId });
        },
        error: (error: HttpErrorResponse) => {
          this.snackbarService.showDangerSnackBar(error.error);
        }
      }
    );
  }

  closeDialog(): void {
    this.ref.close({ isCreated: false });
  }
}
