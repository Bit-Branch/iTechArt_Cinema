//External
import { FileInput, FileValidator } from 'ngx-material-file-input';

//Angular
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';

//Local
import { Favor } from '@core/models/favor';
import { ImageService } from '@core/services/image.service';
import { FavorService } from '@core/services/favor.service';
import { SnackbarService } from '@core/services/snackbar.service';

/* 'size in mb' * 2 ** 20 */
const imageMaxSizeInBytes = 0.3 * 2 ** 20;
const nameControl = 'name';
const descriptionControl = 'description';
const imageControl = 'image';

@Component({
  selector: 'app-favor-dialog',
  templateUrl: './favor-dialog.component.html',
  styleUrls: ['./favor-dialog.component.scss']
})
export class FavorDialogComponent {
  favorForm: FormGroup;
  url = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly favorService: FavorService,
    private readonly imageService: ImageService,
    private readonly snackbarService: SnackbarService,
    private dialogRef: MatDialogRef<FavorDialogComponent>
  ) {
    this.favorForm = this.fb.group({
      [imageControl]: [null, FileValidator.maxContentSize(imageMaxSizeInBytes)],
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
    const imageData = new FormData();
    imageData.append('content', (this.favorForm.get(imageControl)?.value as FileInput).files[0]);
    this.favorService.uploadImage(imageData)
      .subscribe({
        next: (imageId: number) => {
          const favor: Favor = {
            name: this.favorForm.get(nameControl)?.value,
            description: this.favorForm.get(descriptionControl)?.value,
            imageId: imageId
          };
          this.favorService.createFavor(favor)
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
        },
        error: (error: HttpErrorResponse) => {
          this.snackbarService.showDangerSnackBar(error.error);
        }
      });
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
