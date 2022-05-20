import { switchMap } from 'rxjs';

import { Component, Inject, OnInit, ViewChild } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import {
  CalculateTicketDialogComponent
} from '@client-portal/calculate-ticket-dialog/calculate-ticket-dialog.component';
import { SignalRService } from '@core/services/signal-r.service';
import { fullScreenDialogsConfig } from '@core/configuration/dialogs-config';
import { Hall } from '@core/models/hall/hall';
import { SeatTypeService } from '@core/services/seat-type.service';
import { SeatType } from '@core/models/seat-type/seat-type';
import { HallService } from '@core/services/hall.service';
import { SeatingPlanComponent } from '@shared/elements/seating-plan/seating-plan.component';
import {
  PickTicketsCountDialogComponent
} from '@client-portal/pick-tickets-count-dialog/pick-tickets-count-dialog.component';
import { generateRandomHexColorString } from '@core/utils/generate-random-hex-color-string';
import { AvailableSeatType } from '@shared/elements/seating-plan/intefraces/available-seat-type';
import {
  SeatingPlanSharedStateService
} from '@shared/elements/seating-plan/services/seating-plan-shared-state.service';

@Component({
  selector: 'app-book-seats-dialog',
  templateUrl: './book-seats-dialog.component.html',
  styleUrls: ['./book-seats-dialog.component.scss']
})
export class BookSeatsDialogComponent implements OnInit {
  chosenTicketsCount = 0;
  seatsBooked = false;
  availableSeatTypes: AvailableSeatType[] = [];
  blockedSeatsIds: number[] = [];
  @ViewChild(SeatingPlanComponent, { static: true }) seatingPlan!: SeatingPlanComponent;

  constructor(
    private readonly hallService: HallService,
    private readonly seatTypeService: SeatTypeService,
    private readonly signalrService: SignalRService,
    private readonly seatingPlanSharedStateService: SeatingPlanSharedStateService,
    private readonly dialog: MatDialog,
    private readonly dialogRef: MatDialogRef<BookSeatsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private hallId: number
  ) {
  }

  ngOnInit(): void {
    this.signalrService.startConnection(this.hallId);
    this.signalrService.signalRConnection
      .on(
        'UserBlockedSeats', (data: number[]) => {
          if (data) {
            this.seatingPlan.components.forEach(
              component => component.instance.seatComponents
                .forEach(
                  seatComponent => {
                    if (data.includes(seatComponent.seat.id)) {
                      seatComponent.isDisabled = true;
                      seatComponent.markForChangeDetectionCheck();
                    }
                  }
                )
            );
          }
        }
      );
    this.openPickTicketsCountDialog();
    this.seatTypeService.findAllByHallId(this.hallId)
      .pipe(
        switchMap(
          (seatTypes: SeatType[]) => {
            seatTypes.map(seatType => {
                this.availableSeatTypes.push(
                  {
                    seatType: seatType,
                    color: generateRandomHexColorString()
                  }
                );
              }
            );
            return this.hallService.getHallById(this.hallId);
          }
        )
      )
      .subscribe(
        (hall: Hall) => {
          this.seatingPlan.loadPlan(hall.seatingPlan);
          setTimeout(() => this.seatingPlan.loadData(hall.seats, this.availableSeatTypes), 500);
        }
      );
    this.seatingPlanSharedStateService.blockedSeatsIds$
      .subscribe(
        (blockedSeatsIds: number[]) => {
          this.blockedSeatsIds = blockedSeatsIds;
        }
      );
  }

  blockSeats(): void {
    this.signalrService.blockSeats(this.hallId, this.blockedSeatsIds);
    this.openCalculateTicketDialog();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  openPickTicketsCountDialog(): void {
    this.dialog.open(
      PickTicketsCountDialogComponent,
      {
        disableClose: true
      }
    )
      .afterClosed()
      .subscribe(
        (chosenTicketsCount: number) => {
          this.chosenTicketsCount = chosenTicketsCount;
          this.seatingPlanSharedStateService.addMaxBlockSeatsCountToSharedState(chosenTicketsCount);
        }
      );
  }

  private openCalculateTicketDialog(): void {
    this.dialog.open(
      CalculateTicketDialogComponent,
      fullScreenDialogsConfig
    );
  }
}
