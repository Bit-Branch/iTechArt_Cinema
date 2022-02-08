//Angular modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Local
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
