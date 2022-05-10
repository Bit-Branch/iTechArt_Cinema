import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private readonly snackbar: MatSnackBar) {
  }

  showSuccessSnackBar(message: string): void {
    this.snackbar.open(
      message,
      '',
      {
        duration: 3000,
        panelClass: ['snackbar', 'success-snackbar'],
        horizontalPosition: 'start',
        verticalPosition: 'bottom'
      }
    );
  }

  showDangerSnackBar(message: string): void {
    this.snackbar.open(
      message,
      '',
      {
        duration: 3000,
        panelClass: ['snackbar', 'danger-snackbar'],
        horizontalPosition: 'start',
        verticalPosition: 'bottom'
      }
    );
  }
}
