import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { SeatingPlanElement } from '@shared/elements/seating-plan/components/seating-plan-element/seating-plan-element';

@Component({
  selector: 'app-circle-seating-plan-element',
  templateUrl: './round-table.component.html',
  styleUrls: ['./round-table.component.scss', '../../shared.css']
})
export class RoundTableComponent extends SeatingPlanElement implements AfterViewInit {
  seatsCount = 3;
  seatPositions: { top: number, left: number }[] = [];
  @ViewChild('table') table!: ElementRef;

  constructor(dialog: MatDialog) {
    super(dialog);
  }

  ngAfterViewInit(): void {
    this.calculatePositionsOfSeats();
  }

  // calculating position of created seats around table element
  private calculatePositionsOfSeats(): void {
    const intervalBetweenSeats = 360 / this.seatsCount;
    const tableRadius = this.table.nativeElement.offsetWidth;
    const offsetToTableCenter = tableRadius / 2;
    const offsetToSeatCenter = 10;
    const totalOffset = offsetToTableCenter - offsetToSeatCenter;
    for (let i = 0; i < this.seatsCount; i++) {
      this.seatPositions.push(
        {
          top: (Math.sin((intervalBetweenSeats * i) * (Math.PI / 180)) * tableRadius) + totalOffset,
          left: (Math.cos((intervalBetweenSeats * i) * (Math.PI / 180)) * tableRadius) + totalOffset
        }
      );
    }
  }
}
