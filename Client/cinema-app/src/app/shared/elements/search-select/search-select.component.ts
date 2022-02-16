import { Observable } from 'rxjs';

//Angular
import { Component, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

//Local
import { Cinema } from '@core/models/cinema';
import { City } from '@core/models/city';
import { Genre } from '@core/models/genre';
import { Movie } from '@core/models/movie';
import { SeatType } from '@core/models/seat-type';

type availableTypes = City | Genre | Movie | Cinema | SeatType;

@Component({
  selector: 'app-search-select',
  templateUrl: './search-select.component.html'
})
export class SearchSelectComponent implements ControlValueAccessor {
  @Input() disabled = false;
  @Input() values: availableTypes[] | undefined = [];
  @Input() selectPlaceholder = 'Select...';
  @Input() searchInputPlaceholder = 'Type value here...';
  @Input() propertyToDisplayInOption = 'name';
  @Input() searchFunction: ((term: string) => Observable<availableTypes[]>) | undefined;

  selectedValue: availableTypes | undefined;
  selectControl = new FormControl();

  constructor(
    @Optional() @Self() private controlDir: NgControl
  ) {
    if (this.controlDir) {
      this.controlDir.valueAccessor = this;
    }
  }

  onSearch($event: Event): void {
    const term = ($event.target as HTMLInputElement).value;
    if (term) {
      this.searchFunction?.call(this, ($event.target as HTMLInputElement).value)
        .subscribe(
          (values: availableTypes[]) => {
            this.values = values;
          }
        );
    }
  }

  writeValue(value: unknown): void {
    this.selectControl.setValue(value);
  }

  onChange = (value: unknown) => {
  };

  onTouched = () => {
  };

  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  displayValueInOption(value: availableTypes): string | undefined {
    if (value) {
      return value[this.propertyToDisplayInOption as keyof typeof value] as unknown as string;
    }
    return undefined;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  selectNewValue(): void {
    this.onChange(this.selectControl.value);
  }
}
