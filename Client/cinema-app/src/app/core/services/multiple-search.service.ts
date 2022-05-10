import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { MultipleSearchResult } from '@core/models/search/multiple-search-result';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root'
})
export class MultipleSearchService {
  constructor(
    private readonly http: HttpClient
  ) {
  }

  findMoviesCitiesCinemas(term: string): Observable<MultipleSearchResult> {
    return this.http.get<MultipleSearchResult>(
      `${environment.hostUrl}/api/search`,
      { params: new HttpParams().set('term', term) }
    );
  }
}
