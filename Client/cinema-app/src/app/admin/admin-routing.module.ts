//Angular modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Local
import { AdminAuthGuard } from '@core/guards/admin-auth.guard';
import { CreateCinemaComponent } from '@admin/pages/create-cinema/create-cinema.component';
import { CreateMovieSessionComponent } from '@admin/pages/create-movie-session/create-movie-session.component';
import { CreateMovieComponent } from '@admin/pages/create-movie/create-movie.component';
import { CreateFavorComponent } from '@admin/pages/create-favor/create-favor.component';

const routes: Routes = [
  {
    path: 'create-movie',
    component: CreateMovieComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'create-favor',
    component: CreateFavorComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'create-cinema',
    component: CreateCinemaComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'create-movie-session',
    component: CreateMovieSessionComponent,
    canActivate: [AdminAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
