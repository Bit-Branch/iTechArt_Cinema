import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Cinema } from '@core/models/cinema';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {
  constructor(
    private readonly http: HttpClient
  ) {
  }

  createCinema(cinema: Cinema): Observable<number> {
    return this.http.post<number>(`${environment.hostUrl}/api/cinemas/create`, cinema);
  }

  getAllCinemas(): Observable<Cinema[]> {
    return this.http.get<Cinema[]>(`${environment.hostUrl}/api/cinemas`);
  }

  findAllBySearchTerm(term: string): Observable<Cinema[]> {
    return this.http.get<Cinema[]>(`${environment.hostUrl}/api/cinemas?term=${term}`);
  }
}
