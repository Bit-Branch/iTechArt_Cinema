import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '@core/models/movie';
import { environment } from '@environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(
    private readonly http: HttpClient
  ) {
  }

  createMovie(movie: Movie): Observable<number> {
    return this.http.post<number>(`${environment.hostUrl}/api/movies/create`, movie);
  }
}
