import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { PaginationResult } from '@core/models/pagination-result/pagination-result';
import { DisplayMovieSession } from '@core/models/movie-session/display-movie-session';
import { convertTableCurrentStateToHttpParams } from '@core/utils/convert-table-state-to-http-params';
import { UpdateMovieSession } from '@core/models/movie-session/update-movie-session';
import { MovieSession } from '@core/models/movie-session/movie-session';
import { TableCurrentState } from '@shared/elements/editable-table/interfaces/table-current-state';
import { CreateMovieSession } from '@core/models/movie-session/create-movie-session';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieSessionService {
  constructor(
    private readonly http: HttpClient
  ) {
  }

  createMovieSessions(movieSessions: CreateMovieSession[]): Observable<void> {
    return this.http.post<void>(`${environment.hostUrl}/api/movie-sessions`, movieSessions);
  }

  updateMovieSessions(movieSessions: UpdateMovieSession[]): Observable<void> {
    return this.http.put<void>(`${environment.hostUrl}/api/movie-sessions`, movieSessions);
  }

  deleteMovieSession(id: number): Observable<number> {
    return this.http.delete<number>(`${environment.hostUrl}/api/movie-sessions/${id}`);
  }

  getAllMovieSessions(): Observable<MovieSession[]> {
    return this.http.get<MovieSession[]>(`${environment.hostUrl}/api/movie-sessions`);
  }

  getAllMovieSessionsPaged(tableState: TableCurrentState): Observable<PaginationResult<DisplayMovieSession>> {
    const params = convertTableCurrentStateToHttpParams(tableState);
    return this.http.get<PaginationResult<DisplayMovieSession>>(
      `${environment.hostUrl}/api/movie-sessions/paged`,
      { params }
    );
  }

  findAllConflicted(movieSessions: CreateMovieSession[]): Observable<DisplayMovieSession[]> {
    let params = new HttpParams();
    movieSessions.forEach(movieSession => {
      params = params.append('movieSessions', JSON.stringify(movieSession));
    })
    return this.http.get<DisplayMovieSession[]>(
      `${environment.hostUrl}/api/movie-sessions/showing`,
      { params }
    );
  }
}
