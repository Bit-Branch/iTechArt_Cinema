import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '@client-portal/home/home.component';
import { MovieDetailComponent } from '@client-portal/movie-detail/movie-detail.component';

const routes: Routes = [
  {
    path: 'movies',
    component: HomeComponent
  },
  {
    path: 'movie/:id',
    component: MovieDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientPortalRoutingModule {
}
