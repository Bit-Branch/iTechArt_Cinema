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

  getMovieCover(imageId: number): Observable<{ id: number, content: string }> {
    return this.http.get<{ id: number, content: string }>(
      `${environment.hostUrl}/api/movies/image`,
      { params: new HttpParams().set('imageId', imageId) }
    );
  }

  createMovie(movie: CreateMovie): Observable<number> {
    return this.http.post<number>(`${environment.hostUrl}/api/movies`, movie);
  }

  findAllBySearchTerm(term: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${environment.hostUrl}/api/movies`, { params: new HttpParams().set('term', term) });
  }

  getAllMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${environment.hostUrl}/api/movies`);
  }

  deleteMovie(id: number): Observable<number> {
    return this.http.delete<number>(`${environment.hostUrl}/api/movies/${id}`);
  }
}
