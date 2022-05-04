import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { SeatType } from '@core/models/seat-type/seat-type';
import { CreateSeatType } from '@core/models/seat-type/create-seat-type';
import { PaginationResult } from '@core/models/pagination-result/pagination-result';
import { convertTableCurrentStateToHttpParams } from '@core/utils/convert-table-state-to-http-params';
import { environment } from '@environment/environment';
import { TableCurrentState } from '@shared/elements/editable-table/interfaces/table-current-state';

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

  updateSeatType(seatType: SeatType): Observable<number> {
    return this.http.put<number>(`${environment.hostUrl}/api/seat-types`, seatType);
  }

  deleteSeatType(id: number): Observable<number> {
    return this.http.delete<number>(`${environment.hostUrl}/api/seat-types/${id}`);
  }

  findAllByHallId(id: number): Observable<SeatType[]> {
    return this.http.get<SeatType[]>(`${environment.hostUrl}/api/halls/${id}/seat-types`);
  }

  findAllBySearchTerm(term: string): Observable<SeatType[]> {
    return this.http.get<SeatType[]>(
      `${environment.hostUrl}/api/seat-types`,
      { params: new HttpParams().set('term', term) }
    );
  }

  getSeatTypeById(id: number): Observable<SeatType> {
    return this.http.get<SeatType>(`${environment.hostUrl}/api/seat-types/${id}`);
  }

  getAllSeatTypes(): Observable<SeatType[]> {
    return this.http.get<SeatType[]>(`${environment.hostUrl}/api/seat-types`);
  }

  getAllSeatTypesPaged(tableState: TableCurrentState): Observable<PaginationResult<SeatType>> {
    const params = convertTableCurrentStateToHttpParams(tableState);
    return this.http.get<PaginationResult<SeatType>>(
      `${environment.hostUrl}/api/seat-types/paged`,
      { params }
    );
  }
}
