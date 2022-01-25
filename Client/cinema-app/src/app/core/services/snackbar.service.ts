import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private readonly snackbar: MatSnackBar) {
  }

  showSuccessSnackBar(message: string) {
    this.snackbar.open(message, '', {
      duration: 3000,
      panelClass: ['snackbar', 'success-snackbar'],
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

  showDangerSnackBar(message: string) {
    this.snackbar.open(message, '', {
      duration: 3000,
      panelClass: ['snackbar', 'danger-snackbar'],
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }
}
