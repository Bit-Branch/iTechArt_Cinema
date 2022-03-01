import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Hall } from '@core/models/hall/hall';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root'
})
export class HallService {
  constructor(
    private readonly http: HttpClient
  ) {
  }

  createHall(hall: Hall): Observable<number> {
    return this.http.post<number>(`${environment.hostUrl}/api/halls`, hall);
  }

  findAllByCinemaId(id: number): Observable<Hall[]> {
    return this.http.get<Hall[]>(`${environment.hostUrl}/api/halls`, { params: new HttpParams().set('cinemaId', id) });
  }
}
