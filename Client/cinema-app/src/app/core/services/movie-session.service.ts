import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MovieSession } from '@core/models/movie-session';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieSessionService {
  constructor(
    private readonly http: HttpClient
  ) {
  }

  createMovieSession(movieSession: MovieSession): Observable<number> {
    return this.http.post<number>(`${environment.hostUrl}/api/movie-sessions/create`, movieSession);
  }
}
