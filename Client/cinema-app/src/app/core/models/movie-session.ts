export interface MovieSession {
  id?: number,
  movie: string,
  cinema: string,
  hall: string,
  showDateTime: Date,
  seatTypes: string[],
  services: string[],
  ticketPrice: number
}
