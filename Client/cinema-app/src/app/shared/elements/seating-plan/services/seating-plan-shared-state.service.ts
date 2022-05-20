import { BehaviorSubject, Observable } from 'rxjs';

import { ComponentRef, Injectable } from '@angular/core';

import { Seat } from '@core/models/seat/seat';
import { SeatingPlanComponent } from '@shared/elements/seating-plan/seating-plan.component';
import { AvailableSeatType } from '@shared/elements/seating-plan/intefraces/available-seat-type';

/**
 * class which is used for sharing data between hall-dialog and seating-plan components
 */
@Injectable({
  providedIn: 'root'
})
export class SeatingPlanSharedStateService {
  /**
   * observable in which stored all set id's that have been blocked by user
   */
  readonly blockedSeatsIds$: Observable<number[]>;
  /**
   * observable in which stored all components that have been created in seating-plan component
   */
  readonly createdComponents$: Observable<ComponentRef<SeatingPlanComponent>[]>;
  readonly maxBlockedSeatsCount$: Observable<number>;
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
   * subject in which stored all set id's that have been blocked by user
   * @private
   */
  private readonly blockedSeatsIdsSubject = new BehaviorSubject<number[]>([]);
  private readonly maxBlockedSeatsCountSubject = new BehaviorSubject<number>(0);
  /**
   * subject in which stored all components that have been created in seating-plan component
   * @private
   */
  private readonly createdComponentsSubject = new BehaviorSubject<ComponentRef<SeatingPlanComponent>[]>([]);
  /**
   * subject in which stored all seat types that have been selected in hall-dialog component
   * @private
   */
  private readonly availableSeatTypesSubject = new BehaviorSubject<AvailableSeatType[]>([]);
  /**
   * subject in which stored all seats that have been created in seating-plan component
   * @private
   */
  private readonly seatsSubject = new BehaviorSubject<Seat[]>([]);
  /**
   * subject in which stored json string of saved seating plan
   * @private
   */
  private readonly seatingPlanJsonSubject = new BehaviorSubject<string>('');

  constructor() {
    this.createdComponents$ = this.createdComponentsSubject.asObservable();
    this.blockedSeatsIds$ = this.blockedSeatsIdsSubject.asObservable();
    this.maxBlockedSeatsCount$ = this.maxBlockedSeatsCountSubject.asObservable();
    this.seatingPlanJson$ = this.seatingPlanJsonSubject.asObservable();
    this.seats$ = this.seatsSubject.asObservable();
    this.availableSeatTypes$ = this.availableSeatTypesSubject.asObservable();
  }

  private get availableSeatTypes(): AvailableSeatType[] {
    return this.availableSeatTypesSubject.getValue();
  }

  private get seats(): Seat[] {
    return this.seatsSubject.getValue();
  }

  private get createdComponents(): ComponentRef<SeatingPlanComponent>[] {
    return this.createdComponentsSubject.getValue();
  }

  private get blockedSeatsIds(): number[] {
    return this.blockedSeatsIdsSubject.getValue();
  }

  private get maxBlockedSeatsCount(): number {
    return this.maxBlockedSeatsCountSubject.getValue();
  }

  addSeatTypeToSharedState(availableSeatType: AvailableSeatType): void {
    this.availableSeatTypesSubject.next([...this.availableSeatTypes, availableSeatType]);
  }

  removeSeatTypeFromSharedState(availableSeatType: AvailableSeatType): void {
    this.availableSeatTypesSubject.next(
      this.availableSeatTypesSubject.getValue().filter(seatType => seatType !== availableSeatType)
    );
  }

  removeAllSeatTypesFromSharedState(): void {
    this.availableSeatTypesSubject.next([]);
  }

  addBlockedSeatIdToSharedState(id: number): boolean {
    if (this.blockedSeatsIds.length < this.maxBlockedSeatsCount) {
      this.blockedSeatsIdsSubject.next([...this.blockedSeatsIds, id]);
      return true;
    }
    return false;
  }

  removeBlockedSeatIdFromSharedState(id: number): void {
    this.blockedSeatsIdsSubject.next(
      this.blockedSeatsIdsSubject.getValue().filter(blockedId => blockedId !== id)
    );
  }

  removeAllBlockedSeatIdsFromSharedState(): void {
    this.blockedSeatsIdsSubject.next([]);
  }

  addCreatedComponentToSharedState(component: ComponentRef<SeatingPlanComponent>): void {
    this.createdComponentsSubject.next([...this.createdComponents, component]);
  }

  removeCreatedComponentFromSharedState(component: ComponentRef<SeatingPlanComponent>): void {
    this.createdComponentsSubject.next(
      this.createdComponentsSubject.getValue().filter(component => component !== component)
    );
  }

  removeAllCreatedComponentsFromSharedState(): void {
    this.createdComponentsSubject.next([]);
  }

  addMaxBlockSeatsCountToSharedState(maxCount: number): void {
    this.maxBlockedSeatsCountSubject.next(maxCount);
  }

  removeMaxBlockSeatsCountFromSharedState(): void {
    this.maxBlockedSeatsCountSubject.next(0);
  }

  addSeatToSharedState(seat: Seat): void {
    this.seatsSubject.next([...this.seats, seat]);
  }

  addSeatsToSharedState(seats: Seat[]): void {
    this.seatsSubject.next(seats);
  }

  removeSeatFromSharedState(seat: Seat): void {
    this.seatsSubject.next(
      this.seatsSubject.getValue().filter(s => s !== seat)
    );
  }

  removeAllSeatsFromSharedState(): void {
    this.seatsSubject.next([]);
  }

  addSeatingPlanJsonToSharedState(seatingPlanJson: string): void {
    this.seatingPlanJsonSubject.next(seatingPlanJson);
  }

  removeSeatingPlanJsonFromSharedState(): void {
    this.seatingPlanJsonSubject.next('');
  }
}
