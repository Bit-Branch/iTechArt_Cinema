import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Favor } from '@core/models/favor/favor';
import { CreateFavor } from '@core/models/favor/create-favor';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root'
})
export class FavorService {
  constructor(
    private readonly http: HttpClient
  ) {
  }

  uploadImage(image: FormData): Observable<number> {
    return this.http.post<number>(`${environment.hostUrl}/api/favors/image`, image);
  }

  createFavor(favor: CreateFavor): Observable<number> {
    return this.http.post<number>(`${environment.hostUrl}/api/favors`, favor);
  }

  findAllBySearchTerm(term: string): Observable<Favor[]> {
    return this.http.get<Favor[]>(`${environment.hostUrl}/api/favors`, { params: new HttpParams().set('term', term) });
  }
}
