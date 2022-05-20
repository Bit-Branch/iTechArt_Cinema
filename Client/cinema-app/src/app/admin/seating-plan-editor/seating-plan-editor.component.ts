import { Component, ComponentRef, OnInit, ViewChild } from '@angular/core';

import { MatMenuTrigger } from '@angular/material/menu';
import { Seat } from '@core/models/seat/seat';
import {
  BasicSeatGroupComponent
} from '@shared/elements/seating-plan/components/basic-seat-group/basic-seat-group.component';
import { CinemaScreenComponent } from '@shared/elements/seating-plan/components/cinema-screen/cinema-screen.component';
import { RoundTableComponent } from '@shared/elements/seating-plan/components/round-table/round-table.component';
import { SeatingPlanElement } from '@shared/elements/seating-plan/components/seating-plan-element/seating-plan-element';
import { SofaComponent } from '@shared/elements/seating-plan/components/sofa/sofa.component';
import { AvailableSeatType } from '@shared/elements/seating-plan/intefraces/available-seat-type';
import { SeatingPlanComponent } from '@shared/elements/seating-plan/seating-plan.component';
import { SeatMenuManagerService } from '@shared/elements/seating-plan/services/seat-menu-manager.service';
import { SeatingPlanConverterService } from '@shared/elements/seating-plan/services/seating-plan-converter.service';
import {
  SeatingPlanSharedStateService
} from '@shared/elements/seating-plan/services/seating-plan-shared-state.service';

@Component({
  selector: 'app-seating-plan-editor',
  templateUrl: './seating-plan-editor.component.html',
  styleUrls: ['./seating-plan-editor.component.scss']
})
export class SeatingPlanEditorComponent implements OnInit {
  /**
   * x coordinate in which mat-menu component will be placed after user interactions
   */
  menuPositionX = 0;
  /**
   * y coordinate in which mat-menu component will be placed after user interactions
   */
  menuPositionY = 0;
  /**
   * trigger for mat-menu component when editing single seat
   */
  @ViewChild('singleSeatMenuTrigger') singleSeatMenuTrigger!: MatMenuTrigger;
  /**
   * trigger fot mat-menu component when editing multiple seats
   */
  @ViewChild('multiSeatMenuTrigger') multiSeatMenuTrigger!: MatMenuTrigger;
  @ViewChild(SeatingPlanComponent, { static: true }) seatingPlan!: SeatingPlanComponent;

  constructor(
    private readonly seatingPlanConverterService: SeatingPlanConverterService,
    private readonly seatMenuManagerService: SeatMenuManagerService,
    private readonly seatingPlanSharedStateService: SeatingPlanSharedStateService
  ) {
    this.seatMenuManagerService.menuEmitter.subscribe(
      ([clickPosition, isMultipleMenuOpened]) => {
        this.menuPositionX = clickPosition.x;
        this.menuPositionY = clickPosition.y;
        isMultipleMenuOpened ? this.multiSeatMenuTrigger.openMenu() : this.singleSeatMenuTrigger.openMenu();
      }
    );
  }

  ngOnInit(): void {
  }

  saveSeatingPlanInSharedState(): void {
    if (this.seatingPlan.components.length) {
      const seatingPlanJson = this.seatingPlanConverterService.convertComponentsArrayToJsonString(this.seatingPlan.components);
      this.seatingPlanSharedStateService.addSeatingPlanJsonToSharedState(seatingPlanJson);
    } else {
      this.seatingPlanSharedStateService.removeSeatingPlanJsonFromSharedState();
    }
  }

  createBasicSeatGroup(columns: number, rows: number): void {
    const basicSeatGroup = this.seatingPlan.createBasicSeatGroup(columns, rows);
    basicSeatGroup.instance.isEditable = true;
    basicSeatGroup.instance.deleteComponentEvent
      .subscribe(
        (basicSeatGroupComponent: BasicSeatGroupComponent) => this.removeComponent(basicSeatGroupComponent)
      );
  }

  createRoundSeatGroup(seatsCount: number): void {
    const roundSeatGroup = this.seatingPlan.createRoundSeatGroup(seatsCount);
    roundSeatGroup.instance.isEditable = true;
    roundSeatGroup.instance.deleteComponentEvent
      .subscribe(
        (roundSeatGroupComponent: RoundTableComponent) => this.removeComponent(roundSeatGroupComponent)
      );
  }

  createSofa(seatsCount: number): void {
    const sofaSeatGroup = this.seatingPlan.createSofa(seatsCount);
    sofaSeatGroup.instance.isEditable = true;
    sofaSeatGroup.instance.deleteComponentEvent
      .subscribe(
        (sofaSeatGroupComponent: SofaComponent) => this.removeComponent(sofaSeatGroupComponent)
      );
  }

  createCinemaScreen(): void {
    const cinemaScreen = this.seatingPlan.createCinemaScreen();
    cinemaScreen.instance.isEditable = true;
    cinemaScreen.instance.deleteComponentEvent
      .subscribe(
        (cinemaScreenComponent: CinemaScreenComponent) => this.removeComponent(cinemaScreenComponent)
      );
  }

  removeComponent(component: SeatingPlanElement): void {
    const comp = this.seatingPlan.components.find(
      (comp: ComponentRef<SeatingPlanElement> | undefined) =>
        component === comp?.instance
    ) as ComponentRef<SeatingPlanElement>;
    const componentIndex = this.seatingPlan.components.indexOf(comp);
    if (componentIndex !== -1) {
      comp.instance.seatComponents.forEach(
        seatComponent => this.seatingPlanSharedStateService.removeSeatFromSharedState(seatComponent.seat)
      );
      comp?.destroy();
      this.seatingPlan.components.splice(componentIndex, 1);
    }
    this.seatingPlanSharedStateService.removeSeatingPlanJsonFromSharedState();
  }

  loadPlan(seatingPlanJson: string): void {
    this.seatingPlan.loadPlan(seatingPlanJson, true);
  }

  loadData(seats: Seat[], availableSeatTypes: AvailableSeatType[]): void {
    this.seatingPlan.loadData(seats, availableSeatTypes);
  }
}
