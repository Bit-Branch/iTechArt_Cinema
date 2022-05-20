import { Observable } from 'rxjs';

import { Component } from '@angular/core';
import { MatOptionSelectionChange } from '@angular/material/core';

import { SeatComponent } from '@admin/seating-plan/components/seat/seat.component';
import { AvailableSeatType } from '@admin/seating-plan/intefraces/available-seat-type';
import { MultiSelectionService } from '@admin/seating-plan/multi-select-feature/multi-selection.service';
import { SeatingPlanSharedStateService } from '@admin/seating-plan/services/seating-plan-shared-state.service';

@Component({
  selector: 'app-single-seat-menu',
  templateUrl: './single-seat-menu.component.html',
  styleUrls: ['../../../shared.css']
})
export class SingleSeatMenuComponent {
  readonly availableSeatTypes$: Observable<AvailableSeatType[]>;
  selectedSeat: SeatComponent | undefined;

  constructor(
    private readonly sharedStateService: SeatingPlanSharedStateService,
    private readonly multiSelectionService: MultiSelectionService<SeatComponent>
  ) {
    this.availableSeatTypes$ = this.sharedStateService.availableSeatTypes$;
    multiSelectionService.selectedItems$.subscribe(
      (selectedItems: SeatComponent[]) => {
        this.selectedSeat = selectedItems[0];
      }
    );
  }

  onChangeSeatType($event: MatOptionSelectionChange): void {
    this.selectedSeat?.changeCurrentSeatType($event.source.value as AvailableSeatType);
  }

  changeRowName($event: KeyboardEvent): void {
    if (this.selectedSeat) {
      this.selectedSeat.seat.rowName = ($event.target as HTMLInputElement).value;
    }
  }

  changeSeatNo($event: KeyboardEvent): void {
    if (this.selectedSeat) {
      this.selectedSeat.seat.seatNo = Number.parseInt(($event.target as HTMLInputElement).value);
    }
  }

  enableSeat(): void {
    if (this.selectedSeat) {
      this.selectedSeat.isDisabled = false;
    }
  }

  disableSeat(): void {
    if (this.selectedSeat) {
      this.selectedSeat.isDisabled = true;
    }
  }
}
