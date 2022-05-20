import { Observable } from 'rxjs';

import { Component } from '@angular/core';

import { MatOptionSelectionChange } from '@angular/material/core';

import { SeatComponent } from '@shared/elements/seating-plan/components/seat/seat.component';
import { AvailableSeatType } from '@shared/elements/seating-plan/intefraces/available-seat-type';
import { MultiSelectionService } from '@shared/elements/seating-plan/multi-select-feature/multi-selection.service';
import {
  SeatingPlanSharedStateService
} from '@shared/elements/seating-plan/services/seating-plan-shared-state.service';

@Component({
  selector: 'app-multiple-seat-menu',
  templateUrl: './multiple-seat-menu.component.html',
  styleUrls: ['../../seating-plan-editor.component.scss']
})
export class MultipleSeatMenuComponent {
  readonly availableSeatTypes$: Observable<AvailableSeatType[]>;
  selectedSeats: SeatComponent[] | undefined;

  constructor(
    private readonly sharedStateService: SeatingPlanSharedStateService,
    private readonly multiSelectionService: MultiSelectionService<SeatComponent>
  ) {
    this.availableSeatTypes$ = this.sharedStateService.availableSeatTypes$;
    multiSelectionService.selectedItems$.subscribe(
      (selectedItems: SeatComponent[]) => {
        this.selectedSeats = selectedItems;
      }
    );
  }

  changeSeatTypesForAll($event: MatOptionSelectionChange): void {
    this.selectedSeats?.forEach(seat => seat.changeCurrentSeatType($event.source.value as AvailableSeatType));
  }

  enableAll(): void {
    this.selectedSeats?.forEach(seat => seat.isDisabled = false);
  }

  disableAll(): void {
    this.selectedSeats?.forEach(seat => seat.isDisabled = true);
  }

  changeRowNameForAll($event: KeyboardEvent): void {
    this.selectedSeats?.forEach(seat => seat.seat.rowName = ($event.target as HTMLInputElement).value);
  }

  changeSeatNumberForAll($event: KeyboardEvent): void {
    let startNo = Number.parseInt(($event.target as HTMLInputElement).value);
    this.selectedSeats?.forEach(seat => seat.seat.seatNo = startNo++);
  }
}
