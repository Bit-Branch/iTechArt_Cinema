import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { City } from '@core/models/city';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  constructor(
    private readonly http: HttpClient
  ) {
  }

  createCity(city: City): Observable<number> {
    return this.http.post<number>(`${environment.hostUrl}/api/cities/create`, city);
  }

  getAllCities(): Observable<City[]> {
    return this.http.get<City[]>(`${environment.hostUrl}/api/cities`);
  }
}
