import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
}
