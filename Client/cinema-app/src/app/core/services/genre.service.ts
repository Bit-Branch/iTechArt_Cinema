import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Genre } from '@core/models/genre/genre';
import { CreateGenre } from '@core/models/genre/create-genre';
import { environment } from '@environment/environment';

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

  getAllGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${environment.hostUrl}/api/genres`);
  }
}
