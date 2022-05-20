import { PositionOnCanvas } from '@shared/elements/seating-plan/intefraces/position-on-canvas';

export interface JsonSeatingPlanElement {
  id: number,
  instanceName: string,
  positionOnCanvas: PositionOnCanvas
}

export interface JsonRoundTableComponent extends JsonSeatingPlanElement {
  seatPositions: { top: number, left: number }[]
}

export interface JsonBasicSeatGroupComponent extends JsonSeatingPlanElement {
  rows: number,
  columns: number
}

export interface JsonCinemaScreenComponent extends JsonSeatingPlanElement {
  screenLabel: string
}

export interface JsonSofaComponent extends JsonSeatingPlanElement {
  seatsCount: number
}
