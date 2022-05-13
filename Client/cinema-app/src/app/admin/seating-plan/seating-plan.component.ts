import { Component, ComponentRef, Type, ViewChild, ViewContainerRef } from '@angular/core';

import { MatMenuTrigger } from '@angular/material/menu';

import { Seat } from '@core/models/seat/seat';
import { SofaComponent } from '@admin/seating-plan/components/sofa/sofa.component';
import { SeatMenuManagerService } from '@admin/seating-plan/services/seat-menu-manager.service';
import { BasicSeatGroupComponent } from '@admin/seating-plan/components/basic-seat-group/basic-seat-group.component';
import { CinemaScreenComponent } from '@admin/seating-plan/components/cinema-screen/cinema-screen.component';
import { SeatingPlanElement } from '@admin/seating-plan/components/seating-plan-element/seating-plan-element';
import { RoundTableComponent } from '@admin/seating-plan/components/round-table/round-table.component';
import { PositionOnCanvas } from '@admin/seating-plan/intefraces/position-on-canvas';
import { AvailableSeatType } from '@admin/seating-plan/intefraces/available-seat-type';
import { SeatingPlanConverterService } from '@admin/seating-plan/services/seating-plan-converter.service';
import { MultiSelectionService } from '@admin/seating-plan/multi-select-feature/multi-selection.service';
import { SeatingPlanSharedStateService } from '@admin/seating-plan/services/seating-plan-shared-state.service';
import {
  JsonBasicSeatGroupComponent, JsonCinemaScreenComponent, JsonRoundTableComponent, JsonSofaComponent
} from '@admin/seating-plan/intefraces/json-seating-plan-elements';

@Component({
  selector: 'app-seating-plan',
  templateUrl: './seating-plan.component.html',
  styleUrls: ['./seating-plan.component.scss'],
  providers: [MultiSelectionService]
})
export class SeatingPlanComponent {
  /**
   * list of the dynamically created components
   */
  components: ComponentRef<SeatingPlanElement>[] = [];
  /**
   * canvas scale factor for 'changing scale' feature
   */
  canvasScale = 1;
  /**
   * x coordinate in which mat-menu component will be placed after user interactions
   */
  menuPositionX = 0;
  /**
   * y coordinate in which mat-menu component will be placed after user interactions
   */
  menuPositionY = 0;
  /**
   * ng-template in which position seating components are dynamically inserted
   */
  @ViewChild('canvasItem', { read: ViewContainerRef }) canvasItem!: ViewContainerRef;
  /**
   * trigger for mat-menu component when editing single seat
   */
  @ViewChild('singleSeatMenuTrigger') singleSeatMenuTrigger!: MatMenuTrigger;
  /**
   * trigger fot mat-menu component when editing multiple seats
   */
  @ViewChild('multiSeatMenuTrigger') multiSeatMenuTrigger!: MatMenuTrigger;
  /**
   * when this component is created on the canvas - there is a need to set an id to connect seats with this component
   */
  private lastGeneratedId = 0;

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

  createBasicSeatGroup(
    columns: number,
    rows: number,
    positionOnCanvas: PositionOnCanvas = { x: 0, y: 0 },
    id?: number
  ): void {
    const basicSeatGroup = this.addComponent(BasicSeatGroupComponent) as ComponentRef<BasicSeatGroupComponent>;
    basicSeatGroup.instance.currentComponentId = id ?? this.generateId();
    basicSeatGroup.instance.columns = columns;
    basicSeatGroup.instance.rows = rows;
    basicSeatGroup.instance.positionOnCanvas = positionOnCanvas;
    basicSeatGroup.instance.deleteComponentEvent
      .subscribe(
        (basicSeatGroupComponent: BasicSeatGroupComponent) => this.removeComponent(basicSeatGroupComponent)
      );
  }

  createRoundSeatGroup(seatsCount: number, positionOnCanvas: PositionOnCanvas = { x: 0, y: 0 }, id?: number): void {
    const circleSeatGroup = this.addComponent(RoundTableComponent) as ComponentRef<RoundTableComponent>;
    circleSeatGroup.instance.currentComponentId = id ?? this.generateId();
    circleSeatGroup.instance.seatsCount = seatsCount;
    circleSeatGroup.instance.positionOnCanvas = positionOnCanvas;
    circleSeatGroup.instance.deleteComponentEvent
      .subscribe(
        (roundTableComponent: RoundTableComponent) => this.removeComponent(roundTableComponent)
      );
  }

  createSofa(seatsCount: number, positionOnCanvas: PositionOnCanvas = { x: 0, y: 0 }, id?: number): void {
    const sofaSeatGroup = this.addComponent(SofaComponent) as ComponentRef<SofaComponent>;
    sofaSeatGroup.instance.currentComponentId = id ?? this.generateId();
    sofaSeatGroup.instance.seatsCount = seatsCount;
    sofaSeatGroup.instance.positionOnCanvas = positionOnCanvas;
    sofaSeatGroup.instance.deleteComponentEvent
      .subscribe(
        (sofaComponent: SofaComponent) => this.removeComponent(sofaComponent)
      );
  }

  createCinemaScreen(positionOnCanvas: PositionOnCanvas = { x: 0, y: 0 }, screenLabel?: string, id?: number): void {
    const cinemaScreen = this.addComponent(CinemaScreenComponent) as ComponentRef<CinemaScreenComponent>;
    cinemaScreen.instance.currentComponentId = id ?? this.generateId();
    if (screenLabel) {
      cinemaScreen.instance.screenLabel = screenLabel;
    }
    cinemaScreen.instance.positionOnCanvas = positionOnCanvas;
    cinemaScreen.instance.deleteComponentEvent
      .subscribe(
        (cinemaScreenComponent: CinemaScreenComponent) => this.removeComponent(cinemaScreenComponent)
      );
  }

  saveSeatingPlanInSharedState(): void {
    if (this.components.length) {
      const seatingPlanJson = this.seatingPlanConverterService.convertComponentsArrayToJsonString(this.components);
      this.seatingPlanSharedStateService.addSeatingPlanJsonToSharedState(seatingPlanJson);
    } else {
      this.seatingPlanSharedStateService.removeSeatingPlanJsonFromSharedState();
    }
  }

  increaseScale(): void {
    this.canvasScale += .05;
  }

  decreaseScale(): void {
    this.canvasScale -= .05;
  }

  loadPlan(seatingPlanJson: string): void {
    const components = this.seatingPlanConverterService.convertJsonStringToComponentsArray(seatingPlanJson);
    components.forEach(component => {
      switch (component.instanceName) {
        case RoundTableComponent.name : {
          this.createRoundSeatGroup(
            (component as JsonRoundTableComponent).seatPositions.length,
            component.positionOnCanvas,
            component.id
          );
          break;
        }
        case CinemaScreenComponent.name: {
          this.createCinemaScreen(
            component.positionOnCanvas,
            (component as JsonCinemaScreenComponent).screenLabel,
            component.id
          );
          break;
        }
        case BasicSeatGroupComponent.name: {
          this.createBasicSeatGroup(
            (component as JsonBasicSeatGroupComponent).columns,
            (component as JsonBasicSeatGroupComponent).rows,
            component.positionOnCanvas,
            component.id
          );
          break;
        }
        case SofaComponent.name: {
          this.createSofa(
            (component as JsonSofaComponent).seatsCount,
            component.positionOnCanvas,
            component.id
          );
          break;
        }
        default:
          break;
      }
    });
  }

  loadData(seatsData: Seat[], availableSeatTypes: AvailableSeatType[]): void {
    this.components.forEach(component => {
      const componentSeats = seatsData.filter(seat => seat.seatGroupId === component.instance.currentComponentId);
      component.instance.loadValuesForSeatsComponents(componentSeats, availableSeatTypes);
    });
  }

  private addComponent(componentClass: Type<SeatingPlanElement>): ComponentRef<SeatingPlanElement> {
    const addedComponent = this.canvasItem.createComponent(componentClass) as ComponentRef<SeatingPlanElement>;
    this.components.push(addedComponent);
    this.seatingPlanSharedStateService.removeSeatingPlanJsonFromSharedState();
    return addedComponent;
  }

  private removeComponent(component: SeatingPlanElement): void {
    const comp = this.components.find(
      (comp: ComponentRef<SeatingPlanElement> | undefined) =>
        component === comp?.instance
    ) as ComponentRef<SeatingPlanElement>;
    const componentIndex = this.components.indexOf(comp);
    if (componentIndex !== -1) {
      comp.instance.seatComponents.forEach(
        seatComponent => this.seatingPlanSharedStateService.removeSeatFromSharedState(seatComponent.seat)
      );
      comp?.destroy();
      this.components.splice(componentIndex, 1);
    }
    this.seatingPlanSharedStateService.removeSeatingPlanJsonFromSharedState();
  }

  private generateId(): number {
    if (this.components.length > 0) {
      this.lastGeneratedId = Math.max(
        ...this.components.map(
          (component: ComponentRef<SeatingPlanElement>) => component.instance.currentComponentId
        )
      );
    }
    return ++this.lastGeneratedId;
  }
}
