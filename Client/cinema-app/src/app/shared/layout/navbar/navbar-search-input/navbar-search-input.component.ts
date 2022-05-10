import { debounceTime, distinctUntilChanged, EMPTY, fromEvent, map, switchMap } from 'rxjs';

import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { MultipleSearchResult } from '@core/models/search/multiple-search-result';
import { MultipleSearchService } from '@core/services/multiple-search.service';

@Component({
  selector: 'app-navbar-search-input',
  templateUrl: './navbar-search-input.component.html',
  styleUrls: ['./navbar-search-input.component.scss']
})
export class NavbarSearchInputComponent implements AfterViewInit {
  searchResult: MultipleSearchResult | undefined;
  @ViewChild('searchInput', { read: ElementRef }) private searchInput!: ElementRef<HTMLInputElement>;

  constructor(
    private readonly multipleSearchService: MultipleSearchService
  ) {
  }

  ngAfterViewInit(): void {
    // set up searching function with delay and unique values to prevent unnecessary requests to the server
    fromEvent<Event>(this.searchInput.nativeElement, 'keyup')
      .pipe(
        // get entered by user value
        map(
          (event: Event) => (event.target as HTMLInputElement).value
        ),
        // delay for 1000 milliseconds
        debounceTime(1000),
        // if previous value is different from the current
        distinctUntilChanged(),
        switchMap(
          (searchTerm: string) => searchTerm ? this.multipleSearchService.findMoviesCitiesCinemas(searchTerm) : EMPTY
        )
      )
      .subscribe(
        (result: MultipleSearchResult) => this.searchResult = result
      );
  }

  onMovieSelected(id: number): void {
    throw new Error('Method not implemented yet.');
  }

  onCinemaSelected(id: number): void {
    throw new Error('Method not implemented yet.');
  }

  onCitySelected(id: number): void {
    throw new Error('Method not implemented yet.');
  }
}
