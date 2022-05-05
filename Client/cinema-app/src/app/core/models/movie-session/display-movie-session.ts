import { TicketPrice } from '@core/models/ticket-price/ticket-price';

export interface DisplayMovieSession {
  id: number,
  movieId: number,
  hallId: number,
  startShowingTime: Date,
  endShowingTime: Date,
  movieName: string,
  cinemaName: string,
  hallName: string,
  ticketPrices: TicketPrice[]
}
