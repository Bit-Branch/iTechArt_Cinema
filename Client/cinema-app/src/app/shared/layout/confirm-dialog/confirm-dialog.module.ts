import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';

import { ConfirmDialogComponent } from '@shared/layout/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [ConfirmDialogComponent],
  exports: [ConfirmDialogComponent],
  imports: [CommonModule, MatCardModule, MatDialogModule, MatButtonModule]
})
export class ConfirmDialogModule {
}
