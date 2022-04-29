import { EMPTY, forkJoin, switchMap } from 'rxjs';

import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { dialogsConfig } from '@core/configuration/dialogs-config';
import { Cinema } from '@core/models/cinema/cinema';
import { DisplayCinema } from '@core/models/cinema/display-cinema';
import { CinemaService } from '@core/services/cinema.service';
import { PaginationResult } from '@core/models/pagination-result/pagination-result';
import { TableCurrentState } from '@shared/elements/editable-table/interfaces/table-current-state';
import { TruncatePipe } from '@shared/elements/editable-table/pipes/truncate.pipe';
import { TableColumn } from '@shared/elements/editable-table/interfaces/table-column';
import { ConfirmDialogComponent } from '@shared/layout/confirm-dialog/confirm-dialog.component';
import { CinemaDialogComponent } from '@admin/dialogs/cinema-dialog/cinema-dialog.component';

@Component({
  selector: 'app-cinemas',
  templateUrl: './cinemas.component.html'
})
export class CinemasComponent implements OnInit {
  cinemas: PaginationResult<DisplayCinema> = { totalCountInDatabase: 0, items: [] };
  cinemasTableColumns: TableColumn[] = [];

  constructor(
    private readonly dialog: MatDialog,
    private readonly cinemaService: CinemaService
  ) {
  }

  ngOnInit(): void {
    this.initializeColumns();
  }

  openCreateCinemaDialog(): void {
    this.dialog.open(CinemaDialogComponent, dialogsConfig);
  }

  editCinema($event: DisplayCinema): void {
    // run two http requests in parallel to get halls and favors in edited cinema
    forkJoin(
      [
        this.cinemaService.getAllHallsByCinemaId($event.id),
        this.cinemaService.getAllCinemaFavorsByCinemaId($event.id)
      ]
    )
      .pipe(
        // when both requests returned values
        switchMap(
          ([halls, cinemaFavors]) => {
            // create cinema object for editing
            const cinemaForEditing: Cinema = {
              ...$event,
              halls,
              cinemaFavors
            };
            // open editing dialog
            const ref = this.dialog.open(CinemaDialogComponent, { ...dialogsConfig, data: cinemaForEditing });
            // listen for closing opened dialog
            return ref.afterClosed()
          }
        )
      )
      .subscribe(
        // if closed dialog returned updated cinema info
        (data: DisplayCinema) => {
          // update cinemas list
          this.cinemas =
            {
              totalCountInDatabase: this.cinemas.totalCountInDatabase,
              items: this.cinemas.items.map(item => item.id === data.id ? { ...item, ...data } : item)
            };
        }
      );
  }

  deleteCinema($event: DisplayCinema): void {
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
        (id: number) => {
          this.cinemas =
            {
              totalCountInDatabase: --this.cinemas.totalCountInDatabase,
              items: this.cinemas.items.filter(item => item.id !== id)
            }
        }
      );
  }

  getAllCinemas($event: TableCurrentState): void {
    this.cinemaService.getAllCinemasPaged($event)
      .subscribe(
        (value: PaginationResult<DisplayCinema>) => this.cinemas = value
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
        pipe: { pipe: TruncatePipe, pipeArguments: [0, 15] }
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
