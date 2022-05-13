import { Directive, EventEmitter, Output } from '@angular/core';

import { CdkDragEnd } from '@angular/cdk/drag-drop';

import { MatDialog } from '@angular/material/dialog';

import { Seat } from '@core/models/seat/seat';
import { SeatComponent } from '@admin/seating-plan/components/seat/seat.component';
import { PositionOnCanvas } from '@admin/seating-plan/intefraces/position-on-canvas';
import { AvailableSeatType } from '@admin/seating-plan/intefraces/available-seat-type';
import { ConfirmDialogComponent } from '@shared/layout/confirm-dialog/confirm-dialog.component';

/**
 * Base class for all dynamically created seating plan components
 */
@Directive()
export class SeatingPlanElement {
  /**
   * id of current component
   */
  currentComponentId = 0;
  /**
   * position of current component
   */
  positionOnCanvas: PositionOnCanvas = { x: 0, y: 0 };
  /**
   * list of child seat components of current component
   */
  seatComponents: SeatComponent[] = [];
  /**
   * event for deleting current component
   */
  @Output() deleteComponentEvent = new EventEmitter();

  protected constructor(
    private readonly dialog: MatDialog
  ) {
  }

  /**
   * remember new position if component has been dragged by user
   * @param $event
   */
  rememberPositionWhenDragEnded($event: CdkDragEnd): void {
    this.positionOnCanvas = $event.source.getFreeDragPosition();
  }

  /**
   * delete current component
   */
  deleteComponent(): void {
    const dialogRef = this.dialog.open(
      ConfirmDialogComponent,
      {
        data: {
          title: 'Are you sure?',
          message: 'Do you really want to delete this?'
        }
      }
    );
    dialogRef.afterClosed().subscribe((isSubmitted: boolean) => {
      if (isSubmitted) {
        this.deleteComponentEvent.emit(this);
      }
    });
  }

  loadValuesForSeatsComponents(seats: Seat[], availableSeatTypes: AvailableSeatType[]): void {
    for (let i = 0; i < this.seatComponents.length; i++) {
      const currentSeatComponent = this.seatComponents[i];
      const seatOfCurrentComponent = seats.find(seat => seat.indexInsideSeatGroup === i);
      if (seatOfCurrentComponent) {
        Object.assign(currentSeatComponent.seat, seatOfCurrentComponent);
        currentSeatComponent.changeCurrentSeatType(
          availableSeatTypes.find(available => available.seatType.id === seatOfCurrentComponent.seatTypeId)!
        );
      } else {
        currentSeatComponent.isDisabled = true;
      }
      currentSeatComponent.markForChangeDetectionCheck();
    }
  }

  /**
   * default method to add child seat component to list of all seats inside current parent seat group
   * @param $event seat component to add to list
   */
  addSeatToParent($event: SeatComponent): void {
    this.seatComponents.push($event);
  }
}
