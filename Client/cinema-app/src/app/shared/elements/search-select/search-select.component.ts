//External
import { Observable } from 'rxjs';

//Angular
import { Component, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

//Local
import { Cinema } from '@core/models/cinema/cinema';
import { City } from '@core/models/city/city';
import { Genre } from '@core/models/genre/genre';
import { Movie } from '@core/models/movie/movie';
import { SeatType } from '@core/models/seat-type/seat-type';

type availableTypes = City | Genre | Movie | Cinema | SeatType;

@Component({
  selector: 'app-search-select',
  templateUrl: './search-select.component.html'
})
export class SearchSelectComponent<T extends availableTypes> implements ControlValueAccessor {
  @Input() values: T[] = [];
  @Input() selectPlaceholder = 'Select...';
  @Input() searchInputPlaceholder = 'Type value here...';
  /**
   * Object property to use for selected model.
   */
  @Input() bindValue: keyof T = 'id';
  /**
   * Object property to use for label.
   */
  @Input() bindLabel: keyof T = 'id';
  @Input() searchFunction!: ((term: string) => Observable<T[]>);
  onChange!: (value: unknown) => void;
  onTouched!: () => void;

  selectedValue: T | undefined;
  selectControl = new FormControl();

  constructor(
    @Optional() @Self() private controlDir: NgControl
  ) {
    if (controlDir) {
      this.controlDir.valueAccessor = this;
    } else {
      this.onChange = (value: unknown) => {
      };
      this.onTouched = () => {
      };
    }
  }

  onSearch($event: Event): void {
    const term = ($event.target as HTMLInputElement).value;
    if (term) {
      this.searchFunction?.call(null, ($event.target as HTMLInputElement).value)
        .subscribe(
          (values: T[]) => {
            this.values = values;
          }
        );
    }
  }

  writeValue(value: T): void {
    if (value) {
      if (!this.values.includes(value)) {
        this.values.push(value);
      }
      this.selectControl.setValue(value.id);
    }
  }

  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  selectNewValue(): void {
    this.onChange(this.selectControl.value);
  }
}
