import { Seat } from '@core/models/seat/seat';

export interface CreateHall {
  name: string,
  seats: Seat[],
  seatingPlan: string
}
