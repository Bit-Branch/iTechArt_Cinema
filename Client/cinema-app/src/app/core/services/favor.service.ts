import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Favor } from '@core/models/favor';
import { Genre } from '@core/models/genre';
import { environment } from '@environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavorService {
  constructor(
    private readonly http: HttpClient
  ) {
  }

  createFavor(favor: Favor): Observable<number> {
    return this.http.post<number>(`${environment.hostUrl}/api/favors/create`, favor);
  }
}
