import { SeatType } from '@core/models/seat-type/seat-type';

/**
 * Interface for seat types that have been selected in
 * hall-dialog component and need to be available in seating-plan component
 */
export interface AvailableSeatType {
  seatType: SeatType,
  color: string
}
