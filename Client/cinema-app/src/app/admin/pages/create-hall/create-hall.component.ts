import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Hall } from '@core/models/hall';

@Component({
  selector: 'app-create-hall',
  templateUrl: './create-hall.component.html',
  styleUrls: ['./create-hall.component.scss']
})
export class CreateHallComponent {
  hallForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialog: MatDialog
  ) {
    this.hallForm = this.fb.group({
      name: [null, Validators.required],
      seatsCount: [null, Validators.required]
    });
    /*this.cityService.getAllCities()
      .subscribe(
        (cities: City[]) => {
          this.cities = cities;
        }
      );*/
  }

  onSubmit(): void {
    const hall: Hall = {
      name: this.hallForm.get('name')?.value as string,
      seatsCount: this.hallForm.get('seatsCount')?.value as number,
      seatTypes: []
    };
    console.log(hall);
  }
}
