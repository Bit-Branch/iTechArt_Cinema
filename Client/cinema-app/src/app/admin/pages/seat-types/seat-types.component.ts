import { EMPTY, switchMap } from 'rxjs';

import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { Genre } from '@core/models/genre/genre';
import { SeatType } from '@core/models/seat-type/seat-type';
import { SeatTypeService } from '@core/services/seat-type.service';
import { CreationPageDialogData } from '@admin/dialogs/creation-dialog/creation-dialog-messages';
import { PaginationResult } from '@core/models/pagination-result/pagination-result';
import { TableCurrentState } from '@shared/elements/editable-table/interfaces/table-current-state';
import { TableColumn } from '@shared/elements/editable-table/interfaces/table-column';
import { ConfirmDialogComponent } from '@shared/layout/confirm-dialog/confirm-dialog.component';
import { CreationDialogComponent } from '@admin/dialogs/creation-dialog/creation-dialog.component';

@Component({
  selector: 'app-seat-types',
  templateUrl: './seat-types.component.html'
})
export class SeatTypesComponent implements OnInit {
  seatTypes: PaginationResult<SeatType> = { totalCount: 0, items: [] };
  seatTypesTableColumns: TableColumn[] = [];

  constructor(
    private readonly dialog: MatDialog,
    private readonly seatTypeService: SeatTypeService
  ) {
  }

  ngOnInit(): void {
    this.initializeColumns();
  }

  openCreateSeatTypeDialog(): void {
    this.openCreationDialog({ action: 'createSeatType' });
  }

  editSeatType($event: SeatType): void {
    this.openCreationDialog({ payload: $event, action: 'updateSeatType' });
  }

  deleteSeatType($event: Genre): void {
    const dialogRef = this.dialog.open(
      ConfirmDialogComponent,
      {
        data: {
          title: 'Are you sure?',
          message: 'Do you really want to delete this seat type?'
        }
      }
    );
    dialogRef.afterClosed()
      .pipe(
        switchMap(
          (isSubmitted: boolean) => {
            return isSubmitted ? this.seatTypeService.deleteSeatType($event.id) : EMPTY;
          }
        )
      )
      .subscribe(
        (id: number) => {
          this.seatTypes =
            {
              totalCount: --this.seatTypes.totalCount,
              items: this.seatTypes.items.filter(item => item.id !== id)
            }
        }
      );
  }

  getAllSeatTypes($event: TableCurrentState): void {
    this.seatTypeService.getAllSeatTypesPaged($event)
      .subscribe(
        (value: PaginationResult<SeatType>) => this.seatTypes = value
      );
  }

  private initializeColumns(): void {
    this.seatTypesTableColumns = [
      {
        name: 'Seat type name',
        dataKey: 'name',
        isSortable: true
      }
    ];
  }

  private openCreationDialog(data: CreationPageDialogData): void {
    const ref = this.dialog.open(
      CreationDialogComponent,
      {
        data: data
      }
    );
    ref.afterClosed().subscribe(
      (result: { isSaved: boolean, savedEntity: SeatType }) => {
        if (result.isSaved) {
          this.seatTypes =
            {
              totalCount: this.seatTypes.totalCount,
              items: this.seatTypes.items.map(
                item => item.id === result.savedEntity.id
                  ? { ...item, ...result.savedEntity }
                  : item
              )
            };
        }
      }
    );
  }
}
