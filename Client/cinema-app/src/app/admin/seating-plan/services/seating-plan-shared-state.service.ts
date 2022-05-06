import { BehaviorSubject, Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { Seat } from '@core/models/seat/seat';
import { AvailableSeatType } from '@admin/seating-plan/intefraces/available-seat-type';

/**
 * class which is used for sharing data between hall-dialog and seating-plan components
 */
@Injectable({
  providedIn: 'root'
})
export class SeatingPlanSharedStateService {
  /**
   * observable in which stored all seat types that have been selected in hall-dialog component
   */
  readonly availableSeatTypes$: Observable<AvailableSeatType[]>;
  /**
   * observable in which stored all seats that have been created in seating-plan component
   */
  readonly seats$: Observable<Seat[]>;
  /**
   * observable in which stored json string of saved seating plan
   */
  readonly seatingPlanJson$: Observable<string>;
  /**
   * subject in which stored all seat types that have been selected in hall-dialog component
   * @private
   */
  private readonly availableSeatTypesSubject = new BehaviorSubject<AvailableSeatType[]>([]);
  /**
   * subject in which stored json string of saved seating plan
   * @private
   */
  private readonly seatingPlanJsonSubject = new BehaviorSubject<string>('');
  /**
   * subject in which stored all seats that have been created in seating-plan component
   * @private
   */
  private readonly seatsSubject = new BehaviorSubject<Seat[]>([]);

  constructor() {
    this.availableSeatTypes$ = this.availableSeatTypesSubject.asObservable();
    this.seats$ = this.seatsSubject.asObservable();
    this.seatingPlanJson$ = this.seatingPlanJsonSubject.asObservable();
  }

  private get availableSeatTypes(): AvailableSeatType[] {
    return this.availableSeatTypesSubject.getValue();
  }

  private get seats(): Seat[] {
    return this.seatsSubject.getValue();
  }

  addSeatTypeToSharedState(availableSeatType: AvailableSeatType): void {
    this.availableSeatTypesSubject.next([...this.availableSeatTypes, availableSeatType]);
  }

  removeSeatTypeFromSharedState(availableSeatType: AvailableSeatType): void {
    this.availableSeatTypesSubject.next(
      this.availableSeatTypesSubject.getValue().filter(seatType => seatType !== availableSeatType)
    );
  }

  addSeatToSharedState(seat: Seat): void {
    this.seatsSubject.next([...this.seats, seat]);
  }

  removeSeatFromSharedState(seat: Seat): void {
    this.seatsSubject.next(
      this.seatsSubject.getValue().filter(s => s !== seat)
    );
  }

  addSeatingPlanJsonToSharedState(seatingPlanJson: string): void {
    this.seatingPlanJsonSubject.next(seatingPlanJson);
  }

  removeSeatingPlanJsonFromSharedState(): void {
    this.seatingPlanJsonSubject.next('');
  }
}
