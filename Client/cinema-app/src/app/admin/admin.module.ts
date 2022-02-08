//Angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Local modules
import { AdminRoutingModule } from '@admin/admin-routing.module';
import { CinemaDialogModule } from '@admin/dialogs/cinema-dialog/cinema-dialog.module';
import { HallDialogModule } from '@admin/dialogs/hall-dialog/hall-dialog.module';
import { MovieSessionDialogModule } from '@admin/dialogs/movie-session-dialog/movie-session-dialog.module';
import { MovieDialogModule } from '@admin/dialogs/movie-dialog/movie-dialog.module';
import { FavorDialogModule } from '@admin/dialogs/favor-dialog/favor-dialog.module';
import { SidenavModule } from '@admin/sidenav/sidenav.module';
import { ReusableDialogModule } from '@admin/dialogs/reusable-dialog/reusable-dialog.module';
import { CinemasModule } from '@admin/pages/cinemas/cinemas.module';
import { FavorsModule } from '@admin/pages/favors/favors.module';
import { MovieSessionsModule } from '@admin/pages/movie-sessions/movie-sessions.module';
import { MoviesModule } from '@admin/pages/movies/movies.module';

@NgModule({
  declarations: [],
  exports: [
    SidenavModule
  ],
  imports: [
    CommonModule,
    SidenavModule,
    MovieDialogModule,
    CinemaDialogModule,
    MovieSessionDialogModule,
    FavorDialogModule,
    HallDialogModule,
    AdminRoutingModule,
    ReusableDialogModule,
    MoviesModule,
    CinemasModule,
    FavorsModule,
    MovieSessionsModule
  ]
})
export class AdminModule {
}
