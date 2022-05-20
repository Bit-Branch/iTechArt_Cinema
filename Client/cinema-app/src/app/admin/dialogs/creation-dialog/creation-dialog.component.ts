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
  CreationPageKeys, creationPageMessages, CreationPageElements, CreationPageDialogData
} from '@admin/dialogs/creation-dialog/creation-dialog-messages';

@Component({
  selector: 'app-creation-dialog',
  templateUrl: './creation-dialog.component.html',
  styleUrls: ['../dialogs-shared.scss']
})
export class CreationDialogComponent {
  isInEditMode = false;
  readonly nameControl: FormControl;
  private page: CreationPageKeys;

  constructor(
    private readonly genreService: GenreService,
    private readonly cityService: CityService,
    private readonly seatTypeService: SeatTypeService,
    private readonly snackbarService: SnackbarService,
    private readonly ref: MatDialogRef<CreationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData: CreationPageDialogData
  ) {
    this.nameControl = new FormControl(null, [Validators.required]);
    this.page = this.dialogData.action;
    if (this.dialogData.payload) {
      this.nameControl.setValue(this.dialogData.payload.name);
    }
  }

  get currentPageContent(): CreationPageElements {
    return creationPageMessages[this.page];
  }

  saveEntity(): void {
    this.getActionByKey(this.page)
      .subscribe(
        {
          next: (savedEntityId: number) => {
            this.snackbarService.showSuccessSnackBar(this.currentPageContent.successMessage);
            this.ref.close(
              {
                isSaved: true,
                savedEntity: {
                  id: savedEntityId,
                  name: this.nameControl.value
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

  closeDialog(): void {
    this.ref.close({ isSaved: false });
  }

  private getActionByKey(key: CreationPageKeys): Observable<number> {
    let action: Observable<number>;
    const dataForSaving = {
      id: this.dialogData.payload?.id ?? 0,
      name: this.nameControl.value
    }
    switch (key) {
      case 'createCity':
        action = this.cityService.createCity(dataForSaving);
        break;
      case 'createGenre':
        action = this.genreService.createGenre(dataForSaving);
        break;
      case 'createSeatType':
        action = this.seatTypeService.createSeatType(dataForSaving);
        break;
      case 'updateCity':
        action = this.cityService.updateCity(dataForSaving);
        break;
      case 'updateGenre':
        action = this.genreService.updateGenre(dataForSaving);
        break;
      case 'updateSeatType':
        action = this.seatTypeService.updateSeatType(dataForSaving);
        break;
    }
    return action;
  }
}
