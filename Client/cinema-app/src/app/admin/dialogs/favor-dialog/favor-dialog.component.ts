//External
import { FileInput, FileValidator } from 'ngx-material-file-input';

//Angular
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

//Local
import { Favor } from '@core/models/favor';
import { FavorService } from '@core/services/favor.service';
import { SnackbarService } from '@core/services/snackbar.service';

/* 'size in mb' * 2 ** 20 */
const imageMaxSizeInBytes = 0.3 * 2 ** 20;
const nameControl = 'name';
const descriptionControl = 'description';
const imageControl = 'image';
const favorNameProperty: keyof Favor = 'name';
const favorDescriptionProperty: keyof Favor = 'description';
const favorImageProperty: keyof Favor = 'image';

@Component({
  selector: 'app-favor-dialog',
  templateUrl: './favor-dialog.component.html',
  styleUrls: ['./favor-dialog.component.scss']
})
export class FavorDialogComponent {
  favorForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly favorService: FavorService,
    private readonly snackbarService: SnackbarService,
    private dialogRef: MatDialogRef<FavorDialogComponent>
  ) {
    this.favorForm = this.fb.group({
      image: [null, FileValidator.maxContentSize(imageMaxSizeInBytes)],
      name: [null, Validators.required],
      description: [null, Validators.required]
    });
  }

  get nameControl(): string {
    return nameControl;
  }

  get descriptionControl(): string {
    return descriptionControl;
  }

  get imageControl(): string {
    return imageControl;
  }

  onSubmit(): void {
    const favorData = new FormData();
    favorData.append(favorNameProperty, this.favorForm.get(nameControl)?.value);
    favorData.append(favorDescriptionProperty, this.favorForm.get(descriptionControl)?.value);
    const favorImage = (this.favorForm.get(imageControl)?.value as FileInput)?.files[0];
    if (favorImage) {
      favorData.append(favorImageProperty, favorImage);
    }
    this.favorService.createFavor(favorData)
      .subscribe(
        {
          error: (error: HttpErrorResponse) => {
            this.snackbarService.showDangerSnackBar(error.error);
          },
          complete: () => {
            this.snackbarService.showSuccessSnackBar('Favor successfully created');
            this.closeDialog();
          }
        }
      );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
