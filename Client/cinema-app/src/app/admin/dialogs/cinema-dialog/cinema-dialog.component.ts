//External
import { Observable } from 'rxjs';

//Angular
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

//Local
import { CinemaFavor } from '@core/models/cinema-favor/cinema-favor';
import { Cinema } from '@core/models/cinema/cinema';
import { UpdateCinema } from '@core/models/cinema/update-cinema';
import { Hall } from '@core/models/hall/hall';
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
const createDialogTitle = 'Create cinema';
const editDialogTitle = 'Edit cinema';
const createActionButtonLabel = 'Create';
const editActionButtonLabel = 'Apply changes';

@Component({
  selector: 'app-cinema-dialog',
  templateUrl: './cinema-dialog.component.html',
  styleUrls: ['./cinema-dialog.component.scss', '../dialogs-shared.scss']
})
export class CinemaDialogComponent implements OnInit {
  readonly cinemaForm: FormGroup;
  cities: City[] = [];
  halls: Hall[] = [];
  favors: Favor[] = [];
  dialogTitle = createDialogTitle;
  actionButtonLabel = createActionButtonLabel;
  private isInEditMode = false;

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
    private readonly dialogRef: MatDialogRef<CinemaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogCinemaData: Cinema
  ) {
    this.cinemaForm = this.fb.group({
      [nameControl]: [null, Validators.required],
      [cityControl]: [null, Validators.required],
      [addressControl]: [null, Validators.required],
      [cinemaFavorsControl]: this.fb.array([])
    });
    if (dialogCinemaData) {
      this.isInEditMode = true;
      this.dialogTitle = editDialogTitle;
      this.actionButtonLabel = editActionButtonLabel;
    }
  }

  ngOnInit(): void {
    if (this.isInEditMode) {
      this.fillFormWithData();
    }
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
    this.isInEditMode ? this.editCinema() : this.createCinema();
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
    this.dialog.open(
      CreationDialogComponent,
      {
        data: {
          action: 'createCity'
        }
      }
    );
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

  closeDialog(cinema?: UpdateCinema): void {
    this.dialogRef.close(cinema);
  }

  private fillFormWithData(): void {
    if (this.dialogCinemaData.city) {
      this.cities.push(this.dialogCinemaData.city);
    }
    this.cinemaForm.get(nameControl)?.setValue(this.dialogCinemaData.name);
    this.cinemaForm.get(cityControl)?.setValue(this.dialogCinemaData.city?.id);
    this.cinemaForm.get(addressControl)?.setValue(this.dialogCinemaData.address);
    this.fillFavorPricesWithData(this.dialogCinemaData.cinemaFavors);
    this.halls = this.dialogCinemaData.halls;
  }

  private fillFavorPricesWithData(cinemaFavors: CinemaFavor[]): void {
    cinemaFavors.forEach(cinemaFavor => {
      const favorForm = this.fb.group({
        [favorControl]: [null, Validators.required],
        [favorPriceControl]: [null, [Validators.required, Validators.pattern(ValidationPatterns.ONLY_NUMBERS_PATTERN)]]
      });
      this.favorPrices.push(favorForm);
      favorForm.patchValue({
        [favorControl]: cinemaFavor.favor,
        [favorPriceControl]: cinemaFavor.price
      });
    });
  }

  private createCinema(): void {
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

  private editCinema(): void {
    const cinemaFormValue = this.cinemaForm.value;
    const cinema: UpdateCinema = {
      id: this.dialogCinemaData.id,
      name: cinemaFormValue[nameControl],
      address: cinemaFormValue[addressControl],
      cityId: cinemaFormValue[cityControl],
      halls: this.dialogCinemaData.halls,
      cinemaFavors: cinemaFormValue[cinemaFavorsControl].map(
        (item: { [favorControl]: Favor, [favorPriceControl]: number }) => {
          return {
            cinemaId: this.dialogCinemaData.id,
            favorId: item[favorControl].id ?? item[favorControl],
            price: item[favorPriceControl]
          };
        }
      )
    };
    this.cinemaService.updateCinema(cinema)
      .subscribe(
        {
          error: (error: HttpErrorResponse) => {
            this.snackbarService.showDangerSnackBar(error.error);
          },
          complete: () => {
            this.snackbarService.showSuccessSnackBar('Cinema successfully updated');
            this.halls = [];
            this.closeDialog(cinema);
          }
        }
      );
  }
}
