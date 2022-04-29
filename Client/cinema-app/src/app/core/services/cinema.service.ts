import { Observable } from 'rxjs';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Cinema } from '@core/models/cinema/cinema';
import { Hall } from '@core/models/hall/hall';
import { CreateCinema } from '@core/models/cinema/create-cinema';
import { convertTableCurrentStateToHttpParams } from '@core/utils/convert-table-state-to-http-params';
import { UpdateCinema } from '@core/models/cinema/update-cinema';
import { CinemaFavor } from '@core/models/cinema-favor/cinema-favor';
import { PaginationResult } from '@core/models/pagination-result/pagination-result';
import { TableCurrentState } from '@shared/elements/editable-table/interfaces/table-current-state';
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

  updateCinema(cinema: UpdateCinema): Observable<number> {
    return this.http.put<number>(`${environment.hostUrl}/api/cinemas`, cinema);
  }

  getCinemaById(id: number): Observable<Cinema> {
    return this.http.get<Cinema>(`${environment.hostUrl}/api/cinemas/${id}`);
  }

  getAllHallsByCinemaId(id: number): Observable<Hall[]> {
    return this.http.get<Hall[]>(`${environment.hostUrl}/api/cinemas/${id}/halls`);
  }

  getAllCinemaFavorsByCinemaId(id: number): Observable<CinemaFavor[]> {
    return this.http.get<CinemaFavor[]>(`${environment.hostUrl}/api/cinemas/${id}/favors`);
  }

  getAllCinemasPaged(tableState: TableCurrentState): Observable<PaginationResult<Cinema>> {
    const params = convertTableCurrentStateToHttpParams(tableState);
    return this.http.get<PaginationResult<Cinema>>(
      `${environment.hostUrl}/api/cinemas/paged`,
      { params }
    );
  }
}
