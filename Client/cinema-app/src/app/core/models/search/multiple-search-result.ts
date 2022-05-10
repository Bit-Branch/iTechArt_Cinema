import { SearchCinema } from '@core/models/cinema/search-cinema';
import { City } from '@core/models/city/city';
import { SearchMovie } from '@core/models/movie/search-movie';

export interface MultipleSearchResult {
  movies: SearchMovie[],
  cinemas: SearchCinema[],
  cities: City[]
}
