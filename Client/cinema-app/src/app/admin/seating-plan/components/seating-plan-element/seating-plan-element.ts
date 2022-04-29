import { Subject } from 'rxjs';

import { AfterViewInit, EventEmitter, Injectable, Output } from '@angular/core';

import { CdkDragEnd } from '@angular/cdk/drag-drop';

import { MatDialog } from '@angular/material/dialog';

import { Seat } from '@core/models/seat/seat';
import { SeatComponent } from '@admin/seating-plan/components/seat/seat.component';
import { PositionOnCanvas } from '@admin/seating-plan/intefraces/position-on-canvas';
import { ConfirmDialogComponent } from '@shared/layout/confirm-dialog/confirm-dialog.component';

/**
 * Base class for all dynamically created seating plan components
 */
@Injectable()
export abstract class SeatingPlanElement implements AfterViewInit {
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
  /**
   * Notifies when current component view is fully loaded
   * @private
   */
  private componentViewInstantiated = new Subject<void>();

  protected constructor(private readonly dialog: MatDialog) {
  }

  ngAfterViewInit(): void {
    this.componentViewInstantiated.next();
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

  loadValuesForSeatsComponents(seats: Seat[]): void {
    this.componentViewInstantiated.subscribe(
      () => {
        for (let i = 0; i < this.seatComponents.length; i++) {
          const currentSeatComponent = this.seatComponents[i];
          const seatOfCurrentComponent = seats.find(seat => seat.indexInsideSeatGroup === i);
          if (seatOfCurrentComponent) {
            currentSeatComponent.seat = seatOfCurrentComponent;
            // TODO i need to change seat color as well
            // currentSeatComponent.currentSeatColor = ;
          } else {
            currentSeatComponent.isDisabled = true;
          }
        }
      }
    )
  }

  /**
   * default method to add child seat component to list of all seats inside current parent seat group
   * @param $event seat component to add to list
   */
  addSeatToParent($event: SeatComponent): void {
    this.seatComponents.push($event);
  }
}
