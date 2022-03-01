import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { dialogsConfig } from '@core/configuration/dialogs-config';
import { FavorDialogComponent } from '@admin/dialogs/favor-dialog/favor-dialog.component';

@Component({
  selector: 'app-favors',
  template:
    `
      <app-admin-edit-page title="Favors">
        <button mat-stroked-button createButton class="btn" (click)="openCreateFavorDialog()">
          Create new favor
        </button>
      </app-admin-edit-page>
    `
})
export class FavorsComponent {
  constructor(private readonly dialog: MatDialog) {
  }

  openCreateFavorDialog(): void {
    this.dialog.open(FavorDialogComponent, dialogsConfig);
  }
}
