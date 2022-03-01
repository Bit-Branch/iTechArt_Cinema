import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Movie } from '@core/models/movie/movie';
import { CreateMovie } from '@core/models/movie/create-movie';
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
    return this.http.post<number>(`${environment.hostUrl}/api/movies/image`, image);
  }

  createMovie(movie: CreateMovie): Observable<number> {
    return this.http.post<number>(`${environment.hostUrl}/api/movies`, movie);
  }

  findAllBySearchTerm(term: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${environment.hostUrl}/api/movies`, { params: new HttpParams().set('term', term) });
  }
}
