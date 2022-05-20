//Angular modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Local
import { SeatTypesComponent } from '@admin/pages/seat-types/seat-types.component';
import { GenresComponent } from '@admin/pages/genres/genres.component';
import { CitiesComponent } from '@admin/pages/cities/cities.component';
import { CinemasComponent } from '@admin/pages/cinemas/cinemas.component';
import { FavorsComponent } from '@admin/pages/favors/favors.component';
import { MovieSessionsComponent } from '@admin/pages/movie-sessions/movie-sessions.component';
import { MoviesComponent } from '@admin/pages/movies/movies.component';

const routes: Routes = [
  {
    path: 'movies',
    component: MoviesComponent
  },
  {
    path: 'favors',
    component: FavorsComponent
  },
  {
    path: 'cinemas',
    component: CinemasComponent
  },
  {
    path: 'movie-sessions',
    component: MovieSessionsComponent
  },
  {
    path: 'genres',
    component: GenresComponent
  },
  {
    path: 'seat-types',
    component: SeatTypesComponent
  },
  {
    path: 'cities',
    component: CitiesComponent
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
