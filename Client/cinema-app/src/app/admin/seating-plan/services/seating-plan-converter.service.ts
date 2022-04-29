import { ComponentRef, Injectable } from '@angular/core';

import {
  JsonBasicSeatGroupComponent, JsonCinemaScreenComponent,
  JsonRoundTableComponent, JsonSeatingPlanElement, JsonSofaComponent
} from '@admin/seating-plan/intefraces/json-seating-plan-elements';
import { BasicSeatGroupComponent } from '@admin/seating-plan/components/basic-seat-group/basic-seat-group.component';
import { CinemaScreenComponent } from '@admin/seating-plan/components/cinema-screen/cinema-screen.component';
import { SofaComponent } from '@admin/seating-plan/components/sofa/sofa.component';
import { RoundTableComponent } from '@admin/seating-plan/components/round-table/round-table.component';
import { SeatingPlanElement } from '@admin/seating-plan/components/seating-plan-element/seating-plan-element';

@Injectable({
  providedIn: 'root'
})
export class SeatingPlanConverterService {
  convertComponentsArrayToJsonString(components: ComponentRef<SeatingPlanElement>[]): string {
    const componentsArray = this.removeUnnecessaryPropertiesFromComponents(components);
    return JSON.stringify(componentsArray);
  }

  convertJsonStringToComponentsArray(seatingPlanJson: string): JsonSeatingPlanElement[] {
    return JSON.parse(seatingPlanJson);
  }

  // removing standard angular component props to save only necessary ones in database
  private removeUnnecessaryPropertiesFromComponents(
    components: ComponentRef<SeatingPlanElement>[]
  ): JsonSeatingPlanElement[] {
    const componentsArray: JsonSeatingPlanElement[] = [];
    components.forEach(
      (component: ComponentRef<SeatingPlanElement>) => {
        switch (component?.componentType) {
          case RoundTableComponent: {
            componentsArray.push(
              {
                id: component?.instance.currentComponentId,
                instanceName: component?.componentType.name,
                positionOnCanvas: component?.instance.positionOnCanvas,
                seatPositions: (component?.instance as RoundTableComponent).seatPositions
              } as JsonRoundTableComponent
            );
            break;
          }
          case BasicSeatGroupComponent: {
            componentsArray.push(
              {
                id: component?.instance.currentComponentId,
                instanceName: component?.componentType.name,
                positionOnCanvas: component?.instance.positionOnCanvas,
                rows: (component?.instance as BasicSeatGroupComponent).rows,
                columns: (component?.instance as BasicSeatGroupComponent).columns
              } as JsonBasicSeatGroupComponent
            );
            break;
          }
          case CinemaScreenComponent: {
            componentsArray.push(
              {
                id: component?.instance.currentComponentId,
                instanceName: component?.componentType.name,
                positionOnCanvas: component?.instance.positionOnCanvas,
                screenLabel: (component?.instance as CinemaScreenComponent).screenLabel
              } as JsonCinemaScreenComponent
            );
            break;
          }
          case SofaComponent: {
            componentsArray.push(
              {
                id: component?.instance.currentComponentId,
                instanceName: component?.componentType.name,
                positionOnCanvas: component?.instance.positionOnCanvas,
                seatsCount: (component?.instance as SofaComponent).seatsCount
              } as JsonSofaComponent
            );
            break;
          }
          default: {
            break;
          }
        }
      }
    );
    return componentsArray;
  }
}
