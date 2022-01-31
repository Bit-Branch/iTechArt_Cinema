//Angular modules
import { CreateCityDialogModule } from '@admin/dialogs/create-city-dialog/create-city-dialog.module';
import { CreateGenreDialogModule } from '@admin/dialogs/create-genre-dialog/create-genre-dialog.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Custom modules
import { AdminRoutingModule } from '@admin/admin-routing.module';
import { CreateCinemaModule } from '@admin/pages/create-cinema/create-cinema.module';
import { CreateMovieSessionModule } from '@admin/pages/create-movie-session/create-movie-session.module';
import { CreateMovieModule } from '@admin/pages/create-movie/create-movie.module';
import { CreateFavorModule } from '@admin/pages/create-favor/create-favor.module';
import { SidenavModule } from '@admin/sidenav/sidenav.module';

@NgModule({
  declarations: [],
  exports: [
    SidenavModule
  ],
  imports: [
    CommonModule,
    SidenavModule,
    CreateMovieModule,
    CreateCinemaModule,
    CreateMovieSessionModule,
    CreateFavorModule,
    AdminRoutingModule,
    CreateGenreDialogModule,
    CreateCityDialogModule
  ]
})
export class AdminModule {
}
