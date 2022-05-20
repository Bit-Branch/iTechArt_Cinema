import { Observable } from 'rxjs';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { City } from '@core/models/city/city';
import { CreateCity } from '@core/models/city/create-city';
import { PaginationResult } from '@core/models/pagination-result/pagination-result';
import { convertTableCurrentStateToHttpParams } from '@core/utils/convert-table-state-to-http-params';
import { TableCurrentState } from '@shared/elements/editable-table/interfaces/table-current-state';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  constructor(
    private readonly http: HttpClient
  ) {
  }

  createCity(city: CreateCity): Observable<number> {
    return this.http.post<number>(`${environment.hostUrl}/api/cities`, city);
  }

  updateCity(city: City): Observable<number> {
    return this.http.put<number>(`${environment.hostUrl}/api/cities`, city);
  }

  deleteCity(id: number): Observable<number> {
    return this.http.delete<number>(`${environment.hostUrl}/api/cities/${id}`);
  }

  findAllBySearchTerm(term: string): Observable<City[]> {
    return this.http.get<City[]>(`${environment.hostUrl}/api/cities`, { params: new HttpParams().set('term', term) });
  }

  getAllCitiesPaged(tableState: TableCurrentState): Observable<PaginationResult<City>> {
    const params = convertTableCurrentStateToHttpParams(tableState);
    return this.http.get<PaginationResult<City>>(
      `${environment.hostUrl}/api/cities`,
      { params }
    );
  }
}
