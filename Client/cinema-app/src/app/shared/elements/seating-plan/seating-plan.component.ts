import { Component, ComponentRef, Type, ViewChild, ViewContainerRef } from '@angular/core';

import { Seat } from '@core/models/seat/seat';
import { SofaComponent } from '@shared/elements/seating-plan/components/sofa/sofa.component';
import { SeatingPlanElement } from '@shared/elements/seating-plan/components/seating-plan-element/seating-plan-element';
import { AvailableSeatType } from '@shared/elements/seating-plan/intefraces/available-seat-type';
import { PositionOnCanvas } from '@shared/elements/seating-plan/intefraces/position-on-canvas';
import {
  SeatingPlanSharedStateService
} from '@shared/elements/seating-plan/services/seating-plan-shared-state.service';
import {
  BasicSeatGroupComponent
} from '@shared/elements/seating-plan/components/basic-seat-group/basic-seat-group.component';
import { CinemaScreenComponent } from '@shared/elements/seating-plan/components/cinema-screen/cinema-screen.component';
import { RoundTableComponent } from '@shared/elements/seating-plan/components/round-table/round-table.component';
import { SeatingPlanConverterService } from '@shared/elements/seating-plan/services/seating-plan-converter.service';
import { MultiSelectionService } from '@shared/elements/seating-plan/multi-select-feature/multi-selection.service';
import {
  JsonBasicSeatGroupComponent, JsonCinemaScreenComponent, JsonRoundTableComponent, JsonSofaComponent
} from '@shared/elements/seating-plan/intefraces/json-seating-plan-elements';

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
   * ng-template in which position seating components are dynamically inserted
   */
  @ViewChild('canvasItem', { read: ViewContainerRef }) canvasItem!: ViewContainerRef;
  /**
   * when we create new component on canvas - we need to set id to it to connect seats with this component
   */
  private lastGeneratedId = 0;

  constructor(
    private readonly seatingPlanConverterService: SeatingPlanConverterService,
    private readonly seatingPlanSharedStateService: SeatingPlanSharedStateService
  ) {
  }

  increaseScale(): void {
    this.canvasScale += .05;
  }

  decreaseScale(): void {
    this.canvasScale -= .05;
  }

  createBasicSeatGroup(
    columns: number,
    rows: number,
    positionOnCanvas: PositionOnCanvas = { x: 0, y: 0 },
    id?: number,
    isEditable: boolean = false
  ): ComponentRef<BasicSeatGroupComponent> {
    const basicSeatGroup = this.addComponent(BasicSeatGroupComponent) as ComponentRef<BasicSeatGroupComponent>;
    basicSeatGroup.instance.currentComponentId = id ?? this.generateId();
    basicSeatGroup.instance.columns = columns;
    basicSeatGroup.instance.rows = rows;
    basicSeatGroup.instance.positionOnCanvas = positionOnCanvas;
    basicSeatGroup.instance.isEditable = isEditable;
    return basicSeatGroup;
  }

  createRoundSeatGroup(
    seatsCount: number,
    positionOnCanvas: PositionOnCanvas = { x: 0, y: 0 },
    id?: number,
    isEditable: boolean = false
  ): ComponentRef<RoundTableComponent> {
    const circleSeatGroup = this.addComponent(RoundTableComponent) as ComponentRef<RoundTableComponent>;
    circleSeatGroup.instance.currentComponentId = id ?? this.generateId();
    circleSeatGroup.instance.seatsCount = seatsCount;
    circleSeatGroup.instance.positionOnCanvas = positionOnCanvas;
    circleSeatGroup.instance.isEditable = isEditable;
    return circleSeatGroup;
  }

  createSofa(
    seatsCount: number,
    positionOnCanvas: PositionOnCanvas = { x: 0, y: 0 },
    id?: number,
    isEditable: boolean = false
  ): ComponentRef<SofaComponent> {
    const sofaSeatGroup = this.addComponent(SofaComponent) as ComponentRef<SofaComponent>;
    sofaSeatGroup.instance.currentComponentId = id ?? this.generateId();
    sofaSeatGroup.instance.seatsCount = seatsCount;
    sofaSeatGroup.instance.positionOnCanvas = positionOnCanvas;
    sofaSeatGroup.instance.isEditable = isEditable;
    return sofaSeatGroup;
  }

  createCinemaScreen(
    positionOnCanvas: PositionOnCanvas = { x: 0, y: 0 },
    screenLabel?: string,
    id?: number,
    isEditable: boolean = false
  ): ComponentRef<CinemaScreenComponent> {
    const cinemaScreen = this.addComponent(CinemaScreenComponent) as ComponentRef<CinemaScreenComponent>;
    cinemaScreen.instance.currentComponentId = id ?? this.generateId();
    if (screenLabel) {
      cinemaScreen.instance.screenLabel = screenLabel;
    }
    cinemaScreen.instance.positionOnCanvas = positionOnCanvas;
    cinemaScreen.instance.isEditable = isEditable;
    return cinemaScreen;
  }

  loadData(seatsData: Seat[], availableSeatTypes: AvailableSeatType[]): void {
    this.components.forEach(component => {
      const componentSeats = seatsData.filter(seat => seat.seatGroupId === component.instance.currentComponentId);
      component.instance.loadValuesForSeatsComponents(componentSeats, availableSeatTypes);
    });
  }

  loadPlan(seatingPlanJson: string, isEditable: boolean = false): void {
    const components = this.seatingPlanConverterService.convertJsonStringToComponentsArray(seatingPlanJson);
    components.forEach(component => {
      switch (component.instanceName) {
        case RoundTableComponent.name : {
          this.createRoundSeatGroup(
            (component as JsonRoundTableComponent).seatPositions.length,
            component.positionOnCanvas,
            component.id,
            isEditable
          );
          break;
        }
        case CinemaScreenComponent.name: {
          this.createCinemaScreen(
            component.positionOnCanvas,
            (component as JsonCinemaScreenComponent).screenLabel,
            component.id,
            isEditable
          );
          break;
        }
        case BasicSeatGroupComponent.name: {
          this.createBasicSeatGroup(
            (component as JsonBasicSeatGroupComponent).columns,
            (component as JsonBasicSeatGroupComponent).rows,
            component.positionOnCanvas,
            component.id,
            isEditable
          );
          break;
        }
        case SofaComponent.name: {
          this.createSofa(
            (component as JsonSofaComponent).seatsCount,
            component.positionOnCanvas,
            component.id,
            isEditable
          );
          break;
        }
        default:
          break;
      }
    });
  }

  private addComponent(componentClass: Type<SeatingPlanElement>): ComponentRef<SeatingPlanElement> {
    const addedComponent = this.canvasItem.createComponent(componentClass) as ComponentRef<SeatingPlanElement>;
    this.components.push(addedComponent);
    this.seatingPlanSharedStateService.removeSeatingPlanJsonFromSharedState();
    return addedComponent;
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
