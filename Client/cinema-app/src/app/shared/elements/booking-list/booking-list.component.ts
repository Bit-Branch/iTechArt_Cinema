import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Cinema } from '@core/models/cinema/cinema';
import { MovieSession } from '@core/models/movie-session/movie-session';
import { Movie } from '@core/models/movie/movie';

type availableItemTypes = Movie | Cinema;
type availableLinkedShowtimeSessionsTypes = MovieSession;

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss']
})
export class BookingListComponent<T extends availableItemTypes, Y extends availableLinkedShowtimeSessionsTypes> {
  @Input() dates: Date[] = [];
  @Input() listItems: { item: T, linkedShowtimeSessions: Y[] }[] = [];
  @Input() itemPropertyNameForHeader: keyof T | null = null;
  @Input() itemPropertyNameForParagraph: keyof T | null = null;
  @Input() showtimePropertyNameForTime: keyof Y | null = null;
  @Output() onItemClickAction: EventEmitter<T> = new EventEmitter<T>();
  @Output() onTimeClickAction: EventEmitter<{ obj: T, time: string }> = new EventEmitter<{ obj: T, time: string }>();


  getShowingTime(showtimeSession: Y): Date | null {
    if (this.showtimePropertyNameForTime) {
      const timeValue = showtimeSession[this.showtimePropertyNameForTime];
      if (timeValue instanceof Date) {
        return timeValue;
      }
    }
    return null;
  }

  onItemClicked(item: T): void {
    if (this.onItemClickAction.observed) {
      this.onItemClickAction.emit(item);
    }
  }

  onTimeClicked(): void {
    if (this.onTimeClickAction.observed) {
      this.onTimeClickAction.emit();
    }
  }
}
