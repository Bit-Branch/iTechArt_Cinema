//Angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Material modules
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

//Components
import { CinemasComponent } from '@admin/pages/cinemas/cinemas.component';
import { FavorsComponent } from '@admin/pages/favors/favors.component';
import { CitiesComponent } from '@admin/pages/cities/cities.component';
import { GenresComponent } from '@admin/pages/genres/genres.component';
import { SeatTypesComponent } from '@admin/pages/seat-types/seat-types.component';
import { MovieSessionsComponent } from '@admin/pages/movie-sessions/movie-sessions.component';
import { MoviesComponent } from '@admin/pages/movies/movies.component';
import { AdminEditPageComponent } from '@admin/pages/admin-edit-page/admin-edit-page.component';
import { EditableTableModule } from '@shared/elements/editable-table/editable-table.module';

@NgModule({
  declarations: [
    CinemasComponent,
    FavorsComponent,
    MovieSessionsComponent,
    MoviesComponent,
    GenresComponent,
    CitiesComponent,
    SeatTypesComponent,
    AdminEditPageComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    EditableTableModule
  ]
})
export class AdminPagesModule {
}
