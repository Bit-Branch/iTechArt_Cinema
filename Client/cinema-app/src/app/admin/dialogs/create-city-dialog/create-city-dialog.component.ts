import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CityService } from '@core/services/city.service';

@Component({
  selector: 'app-create-city-dialog',
  templateUrl: './create-city-dialog.component.html'
})
export class CreateCityDialogComponent {
  name = new FormControl('', Validators.required);

  constructor(
    private readonly ref: MatDialogRef<CreateCityDialogComponent>,
    private readonly cityService: CityService
  ) {
  }

  createCity() {
    this.cityService.createCity(this.name.value);
  }

  cancel(): void {
    this.ref.close();
  }
}
