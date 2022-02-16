import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SeatType } from '@core/models/seat-type';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SeatTypeService {
  constructor(
    private readonly http: HttpClient
  ) {
  }

  createSeatType(seatType: SeatType): Observable<number> {
    return this.http.post<number>(`${environment.hostUrl}/api/seat-types/create`, seatType);
  }
}