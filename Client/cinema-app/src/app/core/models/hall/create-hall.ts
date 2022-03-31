import { CreateSeat } from '@core/models/seat/create-seat';

export interface CreateHall {
  name: string,
  seats: CreateSeat[]
}
