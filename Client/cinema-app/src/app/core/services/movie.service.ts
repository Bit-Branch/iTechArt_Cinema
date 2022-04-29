import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Movie } from '@core/models/movie/movie';
import { CreateMovie } from '@core/models/movie/create-movie';
import { UpdateMovie } from '@core/models/movie/update-movie';
import { PaginationResult } from '@core/models/pagination-result/pagination-result';
import { convertTableCurrentStateToHttpParams } from '@core/utils/convert-table-state-to-http-params';
import { TableCurrentState } from '@shared/elements/editable-table/interfaces/table-current-state';
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

  editImage(image: FormData): Observable<number> {
    return this.http.put<number>(`${environment.hostUrl}/api/movies/image`, image);
  }

  getMovieCover(imageId: number): Observable<{ id: number, content: string }> {
    return this.http.get<{ id: number, content: string }>(
      `${environment.hostUrl}/api/movies/image`,
      { params: new HttpParams().set('imageId', imageId) }
    );
  }

  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${environment.hostUrl}/api/movies/${id}`);
  }

  createMovie(movie: CreateMovie): Observable<number> {
    return this.http.post<number>(`${environment.hostUrl}/api/movies`, movie);
  }

  updateMovie(movie: UpdateMovie): Observable<number> {
    return this.http.put<number>(`${environment.hostUrl}/api/movies`, movie);
  }

  deleteMovie(id: number): Observable<number> {
    return this.http.delete<number>(`${environment.hostUrl}/api/movies/${id}`);
  }

  findAllBySearchTerm(term: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${environment.hostUrl}/api/movies`, { params: new HttpParams().set('term', term) });
  }

  getAllMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${environment.hostUrl}/api/movies`);
  }

  getAllMoviesPaged(tableState: TableCurrentState): Observable<PaginationResult<Movie>> {
    const params = convertTableCurrentStateToHttpParams(tableState);
    return this.http.get<PaginationResult<Movie>>(
      `${environment.hostUrl}/api/movies/paged`,
      { params }
    );
  }
}
