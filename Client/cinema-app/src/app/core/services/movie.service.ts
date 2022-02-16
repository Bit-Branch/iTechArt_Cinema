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

  uploadImage(image: FormData): Observable<number> {
    return this.http.post<number>(`${environment.hostUrl}/api/movies/create-image`, image);
  }

  createMovie(movie: Movie): Observable<number> {
    return this.http.post<number>(`${environment.hostUrl}/api/movies/create`, movie);
  }

  findAllBySearchTerm(term: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${environment.hostUrl}/api/movies?term=${term}`);
  }
}
