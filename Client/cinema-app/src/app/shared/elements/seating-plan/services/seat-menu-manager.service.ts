import { EventEmitter, Injectable } from '@angular/core';

import { PositionOnCanvas } from '@shared/elements/seating-plan/intefraces/position-on-canvas';

@Injectable({
  providedIn: 'root'
})
export class SeatMenuManagerService {
  menuEmitter: EventEmitter<[PositionOnCanvas, boolean]> = new EventEmitter<[PositionOnCanvas, boolean]>();

  openMultipleSeatMenu($event: MouseEvent): void {
    this.menuEmitter.emit([{ x: $event.clientX, y: $event.clientY }, true]);
  }

  openSingleSeatMenu($event: MouseEvent): void {
    this.menuEmitter.emit([{ x: $event.clientX, y: $event.clientY }, false]);
  }
}
