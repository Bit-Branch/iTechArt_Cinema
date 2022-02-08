import { Favor } from '@core/models/favor';
import { TicketPrice } from '@core/models/ticket-price';

export interface MovieSession {
  id?: number,
  movieId: number,
  hallId: number,
  showTime: Date,
  ticketPrices: TicketPrice[],
  favors?: Favor[]
}
