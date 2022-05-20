//External
import { iif, switchMap } from 'rxjs';

import { FileInput, FileValidator } from 'ngx-material-file-input';

//Angular
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

//Local
import { CreateFavor } from '@core/models/favor/create-favor';
import { ImageUrls } from '@core/constants/image-urls';
import { Favor } from '@core/models/favor/favor';
import { UpdateFavor } from '@core/models/favor/update-favor';
import { FavorService } from '@core/services/favor.service';
import { SnackbarService } from '@core/services/snackbar.service';
import { aspectRatioValidator } from '@core/validators/aspect-ratio-validator';

/* 'size in mb' * 2 ** 20 */
const imageMaxSizeInBytes = 0.3 * 2 ** 20;
const nameControl = 'name';
const descriptionControl = 'description';
const imageControl = 'image';
const createDialogTitle = 'Create favor';
const editDialogTitle = 'Edit favor';
const createActionButtonLabel = 'Create';
const editActionButtonLabel = 'Apply changes';

@Component({
  selector: 'app-favor-dialog',
  templateUrl: './favor-dialog.component.html',
  styleUrls: ['../dialogs-shared.scss']
})
export class FavorDialogComponent implements OnInit {
  readonly favorForm: FormGroup;
  dialogTitle = createDialogTitle;
  actionButtonLabel = createActionButtonLabel;
  url = ImageUrls.DEFAULT_FAVOR_IMAGE_URL;
  private isInEditMode = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly favorService: FavorService,
    private readonly snackbarService: SnackbarService,
    private readonly dialogRef: MatDialogRef<FavorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData: Favor
  ) {
    this.favorForm = this.fb.group({
      [imageControl]: [null, FileValidator.maxContentSize(imageMaxSizeInBytes), aspectRatioValidator(5, 3)],
      [nameControl]: [null, Validators.required],
      [descriptionControl]: [null, Validators.required]
    });
    if (dialogData) {
      this.isInEditMode = true;
      this.dialogTitle = editDialogTitle;
      this.actionButtonLabel = editActionButtonLabel;
    }
  }

  ngOnInit(): void {
    if (this.isInEditMode) {
      this.fillFormWithData();
    }
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
    this.isInEditMode ? this.editFavor() : this.createFavor();
  }

  closeDialog(favor?: UpdateFavor): void {
    this.dialogRef.close(favor);
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

  private fillFormWithData(): void {
    if (this.dialogData.image) {
      this.favorService.getFavorImage(this.dialogData.image.id)
        .subscribe(
          // set new url, so we can see an image preview in opened window
          (data: { id: number, content: string }) => this.url = data.content
        );
    }
    this.favorForm.get(nameControl)?.setValue(this.dialogData.name);
    this.favorForm.get(descriptionControl)?.setValue(this.dialogData.description);
  }

  private createFavor(): void {
    const favorFormValue = this.favorForm.value;
    const favor: CreateFavor = {
      name: favorFormValue[nameControl],
      description: favorFormValue[descriptionControl]
    };
    const imageFile = (favorFormValue[imageControl] as FileInput)?.files[0];
    const imageData = new FormData();
    imageData.append('content', imageFile);
    iif(
      // if image was not uploaded by user
      () => imageFile === undefined,
      // just save favor entity in database without an image
      this.favorService.createFavor(favor),
      // otherwise, save uploaded image first and then favor with saved image id
      this.favorService.uploadImage(imageData)
        .pipe(
          switchMap(
            (imageId: number) => {
              favor.imageId = imageId;
              return this.favorService.createFavor(favor);
            }
          )
        )
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

  private editFavor(): void {
    const favorFormValue = this.favorForm.value;
    const favor: UpdateFavor = {
      id: this.dialogData.id,
      name: favorFormValue[nameControl],
      description: favorFormValue[descriptionControl]
    };
    const imageFile = (favorFormValue[imageControl] as FileInput)?.files[0];
    const imageData = new FormData();
    if (this.dialogData.image) {
      imageData.append('id', this.dialogData.image.id.toString());
    }
    imageData.append('content', imageFile);
    iif(
      // if image was not uploaded
      () => imageFile === undefined,
      // just update favor entry in database
      this.favorService.updateFavor(favor),
      // otherwise
      iif(
        // if favor doesn't have image entry in database
        () => favor.imageId === undefined,
        // upload new image
        this.favorService.uploadImage(imageData),
        // otherwise, update existing favor image in database
        this.favorService.editImage(imageData)
      )
        // remember saved image id in favor entity
        .pipe(
          switchMap(
            (imageId: number) => {
              favor.imageId = imageId;
              return this.favorService.updateFavor(favor);
            }
          )
        )
    )
      .subscribe(
        {
          error: (error: HttpErrorResponse) => {
            this.snackbarService.showDangerSnackBar(error.error);
          },
          complete: () => {
            this.snackbarService.showSuccessSnackBar('Favor successfully updated');
            this.closeDialog(favor);
          }
        }
      );
  }
}
