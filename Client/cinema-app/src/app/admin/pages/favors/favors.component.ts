import { EMPTY, switchMap } from 'rxjs';

import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { dialogsConfig } from '@core/configuration/dialogs-config';
import { FavorDialogComponent } from '@admin/dialogs/favor-dialog/favor-dialog.component';
import { Favor } from '@core/models/favor/favor';
import { FavorService } from '@core/services/favor.service';
import { ConfirmDialogComponent } from '@shared/layout/confirm-dialog/confirm-dialog.component';
import { TableColumn } from '@shared/elements/editable-table/interfaces/table-column';

@Component({
  selector: 'app-favors',
  templateUrl: './favors.component.html'
})
export class FavorsComponent implements OnInit {
  favors: Favor[] = [];
  favorsTableColumns: TableColumn[] = [];

  constructor(
    private readonly dialog: MatDialog,
    private readonly favorService: FavorService
  ) {
  }

  ngOnInit(): void {
    this.initializeColumns();
    this.getAllFavors();
  }

  openCreateFavorDialog(): void {
    this.dialog.open(FavorDialogComponent, dialogsConfig);
  }

  editFavor($event: Favor): void {
    const ref = this.dialog.open(FavorDialogComponent, { ...dialogsConfig, data: $event });
    ref.afterClosed()
      .subscribe(
        (data: Favor) => this.getAllFavors()
      );
  }

  deleteFavor($event: Favor): void {
    const dialogRef = this.dialog.open(
      ConfirmDialogComponent,
      {
        data: {
          title: 'Are you sure?',
          message: 'Do you really want to delete this favor? NOTICE: This action also delete this favor from all cinemas'
        }
      }
    );
    dialogRef.afterClosed()
      .pipe(
        switchMap(
          (isSubmitted: boolean) => {
            return isSubmitted ? this.favorService.deleteFavor($event.id) : EMPTY;
          }
        )
      )
      .subscribe(
        (id: number) => this.getAllFavors()
      );
  }

  private getAllFavors(): void {
    this.favorService.getAllFavors()
      .subscribe(
        favors => this.favors = favors
      );
  }

  private initializeColumns(): void {
    this.favorsTableColumns = [
      {
        name: 'Favor name',
        dataKey: 'name',
        position: 'left',
        isSortable: true
      },
      {
        name: 'Favor description',
        dataKey: 'description',
        position: 'left',
        isSortable: false
      }
    ];
  }
}
