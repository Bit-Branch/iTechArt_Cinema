import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Hall } from '@core/models/hall/hall';
import { SeatType } from '@core/models/seat-type/seat-type';
import { CreateSeatType } from '@core/models/seat-type/create-seat-type';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SeatTypeService {
  constructor(
    private readonly http: HttpClient
  ) {
  }

  createSeatType(seatType: CreateSeatType): Observable<number> {
    return this.http.post<number>(`${environment.hostUrl}/api/seat-types`, seatType);
  }

  findAllByHallId(id: number): Observable<SeatType[]> {
    return this.http.get<Hall[]>(
      `${environment.hostUrl}/api/seat-types/get-by-hall`,
      { params: new HttpParams().set('hallId', id) }
    );
  }

  findAllBySearchTerm(term: string): Observable<SeatType[]> {
    return this.http.get<SeatType[]>(
      `${environment.hostUrl}/api/seat-types`,
      { params: new HttpParams().set('term', term) }
    );
  }
}
