import { MovieSessionDate } from '@core/models/movie-session-date';
import { TicketPrice } from '@core/models/ticket-price';

export interface MovieSession {
  id?: number,
  movieId: number,
  hallId: number,
  showTime: string,
  ticketPrices: TicketPrice[],
  movieSessionDates: MovieSessionDate[]
}
