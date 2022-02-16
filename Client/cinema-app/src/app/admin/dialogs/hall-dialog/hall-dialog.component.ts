//Angular
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

//Local
import { Hall } from '@core/models/hall';
import { ValidationPatterns } from '@core/constants/validation-patterns';

const nameControl = 'name';
const seatsCountControl = 'seatsCount';

@Component({
  selector: 'app-hall-dialog',
  templateUrl: './hall-dialog.component.html',
  styleUrls: ['./hall-dialog.component.scss']
})
export class HallDialogComponent {
  hallForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private dialogRef: MatDialogRef<HallDialogComponent>,
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

  onSubmit(): void {
    const hall: Hall = {
      name: this.hallForm.get(nameControl)?.value,
      seats: []
    };
    this.dialogRef.close(hall);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
