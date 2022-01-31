import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Genre } from '@core/models/genre';
import { environment } from '@environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  constructor(
    private readonly http: HttpClient
  ) {
  }

  createGenre(genre: Genre): Observable<number> {
    return this.http.post<number>(`${environment.hostUrl}/api/genres/create`, genre);
  }

  getAllGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${environment.hostUrl}/api/genres`);
  }
}
