//External
import { Observable } from 'rxjs';

//Angular
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';

//Local
import { CreateHall } from '@core/models/hall/create-hall';
import { City } from '@core/models/city/city';
import { Favor } from '@core/models/favor/favor';
import { ValidationPatterns } from '@core/constants/validation-patterns';
import { CreateCinema } from '@core/models/cinema/create-cinema';
import { CinemaService } from '@core/services/cinema.service';
import { CityService } from '@core/services/city.service';
import { FavorService } from '@core/services/favor.service';
import { SnackbarService } from '@core/services/snackbar.service';
import { dialogsConfig } from '@core/configuration/dialogs-config';
import { HallDialogComponent } from '@admin/dialogs/hall-dialog/hall-dialog.component';
import { CreationDialogComponent } from '@admin/dialogs/creation-dialog/creation-dialog.component';

const nameControl = 'name';
const cityControl = 'city';
const addressControl = 'address';
const cinemaFavorsControl = 'cinemaFavors';
const favorControl = 'favor';
const favorPriceControl = 'price';
const cinemaNameMaxLength = 50;
const cinemaAddressMaxLength = 100;

@Component({
  selector: 'app-cinema-dialog',
  templateUrl: './cinema-dialog.component.html',
  styleUrls: ['./cinema-dialog.component.scss', '../dialogs-shared.scss']
})
export class CinemaDialogComponent {
  readonly cinemaForm: FormGroup;
  cities: City[] = [];
  halls: CreateHall[] = [];
  favors: Favor[] = [];

  searchFavors = (term: string): Observable<Favor[]> => {
    return this.favorService.findAllBySearchTerm(term);
  };

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialog: MatDialog,
    private readonly cityService: CityService,
    private readonly snackbarService: SnackbarService,
    private readonly cinemaService: CinemaService,
    private readonly favorService: FavorService,
    private readonly dialogRef: MatDialogRef<CinemaDialogComponent>
  ) {
    this.cinemaForm = this.fb.group({
      [nameControl]: [null, Validators.required],
      [cityControl]: [null, Validators.required],
      [addressControl]: [null, Validators.required],
      [cinemaFavorsControl]: this.fb.array([])
    });
  }

  get favorPrices(): FormArray {
    return this.cinemaForm.get(cinemaFavorsControl) as FormArray;
  }

  get favorForms(): FormGroup[] {
    return (this.cinemaForm.get(cinemaFavorsControl) as FormArray).controls as FormGroup[];
  }

  get nameControl(): string {
    return nameControl;
  }

  get cityControl(): string {
    return cityControl;
  }

  get addressControl(): string {
    return addressControl;
  }

  get favorControl(): string {
    return favorControl;
  }

  get favorPriceControl(): string {
    return favorPriceControl;
  }

  get cinemaNameMaxLength(): number {
    return cinemaNameMaxLength;
  }

  get cinemaAddressMaxLength(): number {
    return cinemaAddressMaxLength;
  }

  onSubmit(): void {
    const cinemaFormValue = this.cinemaForm.value;
    const cinema: CreateCinema = {
      name: cinemaFormValue[nameControl],
      address: cinemaFormValue[addressControl],
      cityId: cinemaFormValue[cityControl],
      halls: this.halls,
      cinemaFavors: cinemaFormValue[cinemaFavorsControl].map(
        (item: { [favorControl]: number, [favorPriceControl]: number }) => {
          return {
            favorId: item[favorControl],
            price: item[favorPriceControl]
          };
        }
      )
    };
    this.cinemaService.createCinema(cinema)
      .subscribe(
        {
          error: (error: HttpErrorResponse) => {
            this.snackbarService.showDangerSnackBar(error.error);
          },
          complete: () => {
            this.snackbarService.showSuccessSnackBar('Cinema successfully created');
            this.halls = [];
            this.closeDialog();
          }
        }
      );
  }

  onSearchCities(event: Event): void {
    const value = (event.target as HTMLInputElement)?.value;
    this.cityService.findAllBySearchTerm(value)
      .subscribe(
        (cities: City[]) => {
          this.cities = cities;
        }
      );
  }

  openCreateCityDialog(): void {
    this.dialog.open(CreationDialogComponent, { data: 'city' });
  }

  openCreateHallDialog(): void {
    const ref = this.dialog.open(HallDialogComponent, dialogsConfig);
    ref.afterClosed().subscribe(
      (hall: CreateHall) => {
        if (hall.name) {
          this.halls.push(hall);
        }
      }
    );
  }

  editHall(index: number): void {
    const ref = this.dialog.open(HallDialogComponent, { ...dialogsConfig, data: this.halls[index] });
    ref.afterClosed().subscribe(
      (data: CreateHall) => this.halls[index] = data
    );
  }

  deleteHall(index: number): void {
    this.halls.splice(index, 1);
  }

  addFavorPriceForm(): void {
    const favorForm = this.fb.group({
      [favorControl]: [null, Validators.required],
      [favorPriceControl]: [null, [Validators.required, Validators.pattern(ValidationPatterns.ONLY_NUMBERS_PATTERN)]]
    });
    this.favorPrices.push(favorForm);
  }

  deleteFavorPriceForm(index: number): void {
    this.favorPrices.removeAt(index);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
