import { Observable } from 'rxjs';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { City } from '@core/models/city/city';
import { CreateCity } from '@core/models/city/create-city';
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

  findAllBySearchTerm(term: string): Observable<City[]> {
    return this.http.get<City[]>(`${environment.hostUrl}/api/cities`, { params: new HttpParams().set('term', term) });
  }
}
