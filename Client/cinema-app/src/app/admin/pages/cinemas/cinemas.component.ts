import { EMPTY, switchMap } from 'rxjs';

import { SlicePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { dialogsConfig } from '@core/configuration/dialogs-config';
import { Cinema } from '@core/models/cinema/cinema';
import { CinemaService } from '@core/services/cinema.service';
import { CinemaDialogComponent } from '@admin/dialogs/cinema-dialog/cinema-dialog.component';
import { TableColumn } from '@shared/elements/editable-table/interfaces/table-column';
import { ConfirmDialogComponent } from '@shared/layout/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-cinemas',
  templateUrl: './cinemas.component.html'
})
export class CinemasComponent implements OnInit {
  cinemas: Cinema[] = [];
  cinemasTableColumns: TableColumn[] = [];

  constructor(
    private readonly dialog: MatDialog,
    private readonly cinemaService: CinemaService
  ) {
  }

  ngOnInit(): void {
    this.initializeColumns();
    this.getAllCinemas();
  }

  openCreateCinemaDialog(): void {
    this.dialog.open(CinemaDialogComponent, dialogsConfig);
  }

  editCinema($event: Cinema): void {
    const ref = this.dialog.open(CinemaDialogComponent, { ...dialogsConfig, data: $event });
    ref.afterClosed()
      .subscribe(
        (data: Cinema) => this.getAllCinemas()
      );
  }

  deleteCinema($event: Cinema): void {
    const dialogRef = this.dialog.open(
      ConfirmDialogComponent,
      {
        data: {
          title: 'Are you sure?',
          message: 'Do you really want to delete this cinema and all related favors and halls?'
        }
      }
    );
    dialogRef.afterClosed()
      .pipe(
        switchMap(
          (isSubmitted: boolean) => {
            return isSubmitted ? this.cinemaService.deleteCinema($event.id) : EMPTY;
          }
        )
      )
      .subscribe(
        (id: number) => this.getAllCinemas()
      );
  }

  private getAllCinemas(): void {
    this.cinemaService.getAllCinemas()
      .subscribe(
        cinemas => this.cinemas = cinemas
      );
  }

  private initializeColumns(): void {
    this.cinemasTableColumns = [
      {
        name: 'Cinema name',
        dataKey: 'name',
        position: 'left',
        isSortable: true
      },
      {
        name: 'Address',
        dataKey: 'address',
        position: 'left',
        isSortable: false,
        // TODO truncate pipe
        pipe: { pipe: SlicePipe, pipeArguments: [0, 20] }
      },
      {
        name: 'City',
        dataKey: 'city.name',
        isNestedKey: true,
        position: 'left',
        isSortable: true
      }
    ];
  }
}
