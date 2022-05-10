import { Observable } from 'rxjs';

import { Component } from '@angular/core';

import { Movie } from '@core/models/movie/movie';
import { MovieService } from '@core/services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  moviesNowShowing$: Observable<Movie[]>;
  moviesComingSoon$: Observable<Movie[]>;

  constructor(private readonly movieService: MovieService) {
    this.moviesNowShowing$ = this.movieService.getAllMoviesNowShowing();
    this.moviesComingSoon$ = this.movieService.getAllMoviesComingSoon();
  }

  onMovieClicked($event: Movie): void {
    throw new Error('Method not implemented yet.');
  }

  showAllMoviesPage(): void {
    throw new Error('Method not implemented yet.');
  }
}
