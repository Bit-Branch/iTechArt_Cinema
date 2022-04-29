import { EMPTY, switchMap } from 'rxjs';

import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { dialogsConfig } from '@core/configuration/dialogs-config';
import { ImageUrls } from '@core/constants/image-urls';
import { Favor } from '@core/models/favor/favor';
import { FavorService } from '@core/services/favor.service';
import { ImageBase64UrlPipe } from '@core/pipes/image-base64-url.pipe';
import { PaginationResult } from '@core/models/pagination-result/pagination-result';
import { FavorDialogComponent } from '@admin/dialogs/favor-dialog/favor-dialog.component';
import { TableCurrentState } from '@shared/elements/editable-table/interfaces/table-current-state';
import { TruncatePipe } from '@shared/elements/editable-table/pipes/truncate.pipe';
import { ConfirmDialogComponent } from '@shared/layout/confirm-dialog/confirm-dialog.component';
import { TableColumn } from '@shared/elements/editable-table/interfaces/table-column';

@Component({
  selector: 'app-favors',
  templateUrl: './favors.component.html'
})
export class FavorsComponent implements OnInit {
  favors: PaginationResult<Favor> = { totalCountInDatabase: 0, items: [] };
  favorsTableColumns: TableColumn[] = [];

  constructor(
    private readonly dialog: MatDialog,
    private readonly favorService: FavorService
  ) {
  }

  ngOnInit(): void {
    this.initializeColumns();
  }

  openCreateFavorDialog(): void {
    this.dialog.open(FavorDialogComponent, dialogsConfig);
  }

  editFavor($event: Favor): void {
    const ref = this.dialog.open(FavorDialogComponent, { ...dialogsConfig, data: $event });
    ref.afterClosed()
      .subscribe(
        (data: Favor) => {
          this.favors =
            {
              totalCountInDatabase: this.favors.totalCountInDatabase,
              items: this.favors.items.map(item => item.id === data.id ? { ...item, ...data } : item)
            };
        }
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
        (id: number) => {
          this.favors =
            {
              totalCountInDatabase: --this.favors.totalCountInDatabase,
              items: this.favors.items.filter(item => item.id !== id)
            }
        }
      );
  }

  getAllFavors($event: TableCurrentState): void {
    this.favorService.getAllFavorsPaged($event)
      .subscribe(
        (value: PaginationResult<Favor>) => this.favors = value
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
        name: 'Image',
        dataKey: 'image.content',
        position: 'left',
        isNestedKey: true,
        containsImageUrlOrBase64Data: true,
        pipe: { pipe: ImageBase64UrlPipe, pipeArguments: [ImageUrls.DEFAULT_FAVOR_IMAGE_URL] }
      },
      {
        name: 'Favor description',
        dataKey: 'description',
        position: 'left',
        isSortable: false,
        pipe: { pipe: TruncatePipe, pipeArguments: [0, 20] }
      }
    ];
  }
}
