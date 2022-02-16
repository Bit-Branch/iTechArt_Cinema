import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { dialogsConfig } from '@core/configuration/dialogs-config';
import { FavorDialogComponent } from '@admin/dialogs/favor-dialog/favor-dialog.component';

@Component({
  selector: 'app-favors',
  templateUrl: './favors.component.html'
})
export class FavorsComponent {
  constructor(private readonly dialog: MatDialog) {
  }

  openCreateFavorDialog(): void {
    this.dialog.open(FavorDialogComponent, dialogsConfig);
  }
}
