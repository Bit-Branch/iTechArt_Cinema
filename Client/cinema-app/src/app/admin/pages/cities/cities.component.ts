import { EMPTY, switchMap } from 'rxjs';

import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { City } from '@core/models/city/city';
import { PaginationResult } from '@core/models/pagination-result/pagination-result';
import { CityService } from '@core/services/city.service';
import { CreationPageDialogData } from '@admin/dialogs/creation-dialog/creation-dialog-messages';
import { CreationDialogComponent } from '@admin/dialogs/creation-dialog/creation-dialog.component';
import { TableColumn } from '@shared/elements/editable-table/interfaces/table-column';
import { TableCurrentState } from '@shared/elements/editable-table/interfaces/table-current-state';
import { ConfirmDialogComponent } from '@shared/layout/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html'
})
export class CitiesComponent implements OnInit {
  cities: PaginationResult<City> = { totalCount: 0, items: [] };
  citiesTableColumns: TableColumn[] = [];

  constructor(
    private readonly dialog: MatDialog,
    private readonly cityService: CityService
  ) {
  }

  ngOnInit(): void {
    this.initializeColumns();
  }

  openCreateCityDialog(): void {
    this.openCreationDialog({ action: 'createCity' });
  }

  editCity($event: City): void {
    this.openCreationDialog({ payload: $event, action: 'updateCity' });
  }

  deleteCity($event: City): void {
    const dialogRef = this.dialog.open(
      ConfirmDialogComponent,
      {
        data: {
          title: 'Are you sure?',
          message: 'Do you really want to delete this city?'
        }
      }
    );
    dialogRef.afterClosed()
      .pipe(
        switchMap(
          (isSubmitted: boolean) => {
            return isSubmitted ? this.cityService.deleteCity($event.id) : EMPTY;
          }
        )
      )
      .subscribe(
        (id: number) => {
          this.cities =
            {
              totalCount: --this.cities.totalCount,
              items: this.cities.items.filter(item => item.id !== id)
            }
        }
      );
  }

  getAllCities($event: TableCurrentState): void {
    this.cityService.getAllCitiesPaged($event)
      .subscribe(
        (value: PaginationResult<City>) => this.cities = value
      );
  }

  private initializeColumns(): void {
    this.citiesTableColumns = [
      {
        name: 'City name',
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
      (result: { isSaved: boolean, savedEntity: City }) => {
        if (result.isSaved) {
          this.cities =
            {
              totalCount: this.cities.totalCount,
              items: this.cities.items.map(
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
