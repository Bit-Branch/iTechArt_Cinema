//External
import { iif, switchMap } from 'rxjs';

import { FileInput, FileValidator } from 'ngx-material-file-input';

//Angular
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';

//Local
import { CreateFavor } from '@core/models/favor/create-favor';
import { FavorService } from '@core/services/favor.service';
import { SnackbarService } from '@core/services/snackbar.service';
import { aspectRatioValidator } from '@core/validators/aspect-ratio-validator';

/* 'size in mb' * 2 ** 20 */
const imageMaxSizeInBytes = 0.3 * 2 ** 20;
const nameControl = 'name';
const descriptionControl = 'description';
const imageControl = 'image';

@Component({
  selector: 'app-favor-dialog',
  templateUrl: './favor-dialog.component.html',
  styleUrls: ['../dialogs-shared.scss']
})
export class FavorDialogComponent {
  readonly favorForm: FormGroup;
  url = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly favorService: FavorService,
    private readonly snackbarService: SnackbarService,
    private readonly dialogRef: MatDialogRef<FavorDialogComponent>
  ) {
    this.favorForm = this.fb.group({
      [imageControl]: [null, FileValidator.maxContentSize(imageMaxSizeInBytes), aspectRatioValidator(5, 3)],
      [nameControl]: [null, Validators.required],
      [descriptionControl]: [null, Validators.required]
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
    const favorFormValue = this.favorForm.value;
    const favor: CreateFavor = {
      name: favorFormValue[nameControl],
      description: favorFormValue[descriptionControl]
    };
    const imageFile = (favorFormValue[imageControl] as FileInput)?.files[0];
    const imageData = new FormData();
    imageData.append('content', imageFile);
    // if image was uploaded by user - save it and return an id and then save favor with this image id
    // else - save favor without an image
    iif(
      () => imageFile !== undefined,
      this.favorService.uploadImage(imageData)
        .pipe(
          switchMap(
            (imageId: number) => {
              favor.imageId = imageId;
              return this.favorService.createFavor(favor);
            }
          )
        ),
      this.favorService.createFavor(favor)
    )
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

  onSelectFile($event: Event): void {
    const image = ($event.target as HTMLInputElement).files?.item(0);
    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (event: ProgressEvent<FileReader>) => {
        this.url = event.target?.result as string;
      };
    }
  }
}
