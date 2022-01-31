import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City } from '@core/models/city';
import { Genre } from '@core/models/genre';
import { environment } from '@environment/environment';
import { Observable } from 'rxjs';

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
}
