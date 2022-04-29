import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Genre } from '@core/models/genre/genre';
import { CreateGenre } from '@core/models/genre/create-genre';
import { PaginationResult } from '@core/models/pagination-result/pagination-result';
import { convertTableCurrentStateToHttpParams } from '@core/utils/convert-table-state-to-http-params';
import { environment } from '@environment/environment';
import { TableCurrentState } from '@shared/elements/editable-table/interfaces/table-current-state';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  constructor(
    private readonly http: HttpClient
  ) {
  }

  createGenre(genre: CreateGenre): Observable<number> {
    return this.http.post<number>(`${environment.hostUrl}/api/genres`, genre);
  }

  updateGenre(genre: Genre): Observable<number> {
    return this.http.put<number>(`${environment.hostUrl}/api/genres`, genre);
  }

  deleteGenre(id: number): Observable<number> {
    return this.http.delete<number>(`${environment.hostUrl}/api/genres/${id}`);
  }

  getAllGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${environment.hostUrl}/api/genres`);
  }

  getAllGenresPaged(tableState: TableCurrentState): Observable<PaginationResult<Genre>> {
    const params = convertTableCurrentStateToHttpParams(tableState);
    return this.http.get<PaginationResult<Genre>>(
      `${environment.hostUrl}/api/genres/paged`,
      { params }
    );
  }
}
