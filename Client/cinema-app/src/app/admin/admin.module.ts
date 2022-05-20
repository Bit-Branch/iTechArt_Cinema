//Angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Local modules
import { CoreModule } from '@core/core.module';
import { AdminRoutingModule } from '@admin/admin-routing.module';
import { CinemaDialogModule } from '@admin/dialogs/cinema-dialog/cinema-dialog.module';
import { HallDialogModule } from '@admin/dialogs/hall-dialog/hall-dialog.module';
import { MovieSessionDialogModule } from '@admin/dialogs/movie-session-dialog/movie-session-dialog.module';
import { MovieDialogModule } from '@admin/dialogs/movie-dialog/movie-dialog.module';
import { FavorDialogModule } from '@admin/dialogs/favor-dialog/favor-dialog.module';
import { CreationDialogModule } from '@admin/dialogs/creation-dialog/creation-dialog.module';
import { AdminPagesModule } from '@admin/pages/admin-pages.module';

@NgModule({
  imports: [
    CommonModule,
    MovieDialogModule,
    CinemaDialogModule,
    MovieSessionDialogModule,
    FavorDialogModule,
    HallDialogModule,
    AdminRoutingModule,
    CreationDialogModule,
    AdminPagesModule,
    CoreModule
  ]
})
export class AdminModule {
}
