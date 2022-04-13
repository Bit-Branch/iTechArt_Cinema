import { Observable } from 'rxjs';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Cinema } from '@core/models/cinema/cinema';
import { CreateCinema } from '@core/models/cinema/create-cinema';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {
  constructor(
    private readonly http: HttpClient
  ) {
  }

  createCinema(cinema: CreateCinema): Observable<number> {
    return this.http.post<number>(`${environment.hostUrl}/api/cinemas`, cinema);
  }

  getAllCinemas(): Observable<Cinema[]> {
    return this.http.get<Cinema[]>(`${environment.hostUrl}/api/cinemas`);
  }

  findAllBySearchTerm(term: string): Observable<Cinema[]> {
    return this.http.get<Cinema[]>(
      `${environment.hostUrl}/api/cinemas`,
      { params: new HttpParams().set('term', term) }
    );
  }

  deleteCinema(id: number): Observable<number> {
    return this.http.delete<number>(`${environment.hostUrl}/api/cinemas/${id}`);
  }
}
