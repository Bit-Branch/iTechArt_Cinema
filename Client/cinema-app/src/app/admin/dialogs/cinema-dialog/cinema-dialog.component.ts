import { Observable } from 'rxjs';

//Angular
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';

//Local
import { Cinema } from '@core/models/cinema';
import { CinemaFavor } from '@core/models/cinema-favor';
import { City } from '@core/models/city';
import { Favor } from '@core/models/favor';
import { Hall } from '@core/models/hall';
import { ValidationPatterns } from '@core/constants/validation-patterns';
import { CinemaService } from '@core/services/cinema.service';
import { CityService } from '@core/services/city.service';
import { FavorService } from '@core/services/favor.service';
import { SnackbarService } from '@core/services/snackbar.service';
import { dialogsConfig } from '@core/configuration/dialogs-config';
import { HallDialogComponent } from '@admin/dialogs/hall-dialog/hall-dialog.component';
import { ReusableDialogComponent } from '@admin/dialogs/reusable-dialog/reusable-dialog.component';

const nameControl = 'name';
const cityControl = 'city';
const addressControl = 'address';
const favorPricesControl = 'favorPrices';
const favorControl = 'favor';
const favorPriceControl = 'favorPrice';
const cinemaNameMaxLength = 50;
const cinemaAddressMaxLength = 100;

@Component({
  selector: 'app-cinema-dialog',
  templateUrl: './cinema-dialog.component.html',
  styleUrls: ['./cinema-dialog.component.scss']
})
export class CinemaDialogComponent {
  cities: City[] = [];
  halls: Hall[] = [];
  favors: Favor[] = [];
  cinemaForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialog: MatDialog,
    private readonly cityService: CityService,
    private readonly snackbarService: SnackbarService,
    private readonly cinemaService: CinemaService,
    private readonly favorService: FavorService,
    private dialogRef: MatDialogRef<CinemaDialogComponent>
  ) {
    this.cinemaForm = this.fb.group({
      [nameControl]: [null, Validators.required],
      [cityControl]: [null, Validators.required],
      [addressControl]: [null, Validators.required],
      [favorPricesControl]: this.fb.array([])
    });
  }

  get favorPrices(): FormArray {
    return this.cinemaForm.get(favorPricesControl) as FormArray;
  }

  get favorForms(): FormGroup[] {
    return (this.cinemaForm.get(favorPricesControl) as FormArray).controls as FormGroup[];
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
    const cinema: Cinema = {
      name: this.cinemaForm.get(nameControl)?.value,
      address: this.cinemaForm.get(addressControl)?.value,
      cityId: this.cinemaForm.get(cityControl)?.value,
      halls: this.halls,
      cinemaFavors: this.convertFavorPricesFormArrayToCinemaFavors()
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

  searchFavors(term: string): Observable<Favor[]> {
    return this.favorService.findAllBySearchTerm(term);
  }

  openCreateCityDialog(): void {
    const ref = this.dialog.open(ReusableDialogComponent, { data: 'city' });
    ref.afterClosed().subscribe();
  }

  openCreateHallDialog(): void {
    const ref = this.dialog.open(HallDialogComponent, dialogsConfig);
    ref.afterClosed().subscribe(
      (hall: Hall) => {
        if (hall.name) {
          this.halls.push(hall);
        }
      }
    );
  }

  editHall(index: number): void {
    const ref = this.dialog.open(HallDialogComponent, { ...dialogsConfig, data: this.halls[index] });
    ref.afterClosed().subscribe(
      (data: Hall) => this.halls[index] = data
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

  private convertFavorPricesFormArrayToCinemaFavors(): CinemaFavor[] {
    const cinemaFavors: CinemaFavor[] = [];
    this.favorForms.forEach(
      (value: FormGroup) => {
        const cinemaFavor: CinemaFavor = {
          favorId: value.get(favorControl)?.value,
          price: value.get(favorPriceControl)?.value
        };
        cinemaFavors.push(cinemaFavor);
      });
    return cinemaFavors;
  }
}
