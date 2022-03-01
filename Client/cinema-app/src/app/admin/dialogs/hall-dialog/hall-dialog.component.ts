//Angular
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

//Local
import { Hall } from '@core/models/hall/hall';
import { CreateHall } from '@core/models/hall/create-hall';
import { SeatType } from '@core/models/seat-type/seat-type';
import { ValidationPatterns } from '@core/constants/validation-patterns';
import { CreationDialogComponent } from '@admin/dialogs/creation-dialog/creation-dialog.component';

const nameControl = 'name';
const seatsCountControl = 'seatsCount';

@Component({
  selector: 'app-hall-dialog',
  templateUrl: './hall-dialog.component.html',
  styleUrls: ['./hall-dialog.component.scss', '../dialogs-shared.scss']
})
export class HallDialogComponent {
  readonly hallForm: FormGroup;
  seatTypes: SeatType[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialog: MatDialog,
    private readonly dialogRef: MatDialogRef<HallDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData: Hall
  ) {
    this.hallForm = this.fb.group({
      [nameControl]: [null, Validators.required],
      [seatsCountControl]: [null, [Validators.required, Validators.pattern(ValidationPatterns.ONLY_NUMBERS_PATTERN)]]
    });
    this.hallForm.get(nameControl)?.setValue(dialogData?.name);
    this.hallForm.get(seatsCountControl)?.setValue(dialogData?.seats.length);
  }

  get nameControl(): string {
    return nameControl;
  }

  get seatsCountControl(): string {
    return seatsCountControl;
  }

  openCreateSeatTypeDialog(): void {
    this.dialog.open(CreationDialogComponent, { data: 'seatType' });
  }

  onSubmit(): void {
    const hall: CreateHall = {
      name: this.hallForm.get(nameControl)?.value,
      seats: [] //WIP implementing seating plan feature
    };
    this.dialogRef.close(hall);
  }

  closeDialog(): void {
    this.dialogRef.close(this.dialogData);
  }
}
