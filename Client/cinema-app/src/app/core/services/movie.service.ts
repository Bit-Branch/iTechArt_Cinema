import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Movie } from '@core/models/movie';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(
    private readonly http: HttpClient
  ) {
  }

  createMovie(movieForm: FormData): Observable<number> {
    return this.http.post<number>(`${environment.hostUrl}/api/movies/create`, movieForm);
  }

  getAllMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${environment.hostUrl}/api/movies`);
  }
}
