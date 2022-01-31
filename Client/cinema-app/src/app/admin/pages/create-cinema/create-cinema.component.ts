import { CreateCityDialogComponent } from '@admin/dialogs/create-city-dialog/create-city-dialog.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Cinema } from '@core/models/cinema';
import { City } from '@core/models/city';
import { Hall } from '@core/models/hall';

const onlyNumbersPattern = /^[0-9]*$/;

@Component({
  selector: 'app-create-cinema',
  templateUrl: './create-cinema.component.html',
  styleUrls: ['./create-cinema.component.scss']
})
export class CreateCinemaComponent {
  cities: City[] = [];
  halls: Hall[] = [];
  fileName = '';
  hallCounter = 0;
  cinemaForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialog: MatDialog
  ) {
    this.cinemaForm = this.fb.group({
      name: [null, Validators.required],
      city: [null, Validators.required],
      address: [null, Validators.required]
     // hallCount: [null, [Validators.required, Validators.pattern(onlyNumbersPattern)]]
    });
    /*this.cityService.getAllCities()
      .subscribe(
        (cities: City[]) => {
          this.cities = cities;
        }
      );*/
  }

  get showtimeRange() {
    return this.cinemaForm.get('showtimeRange') as FormGroup;
  }

  onSubmit(): void {
    const cinema: Cinema = {
      name: this.cinemaForm.get('name')?.value as string,
      address: this.cinemaForm.get('address')?.value as string,
      city: this.cinemaForm.get('city')?.value as string,
      halls: []
    };
    console.log(cinema);
  }

  openCreateCityDialog(): void {
    this.dialog.open(CreateCityDialogComponent);
  }

  counter(i: number): number[] {
    return new Array(i);
  }

  onAdd(): void {
    this.halls.push();
  }

  createHall(index: number): void {

  }

  editHall(index: number): void {

  }

  deleteHall(index: number): void {
    this.halls.splice(index, 1);
  }
}
