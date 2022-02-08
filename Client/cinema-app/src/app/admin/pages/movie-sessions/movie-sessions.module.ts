//Angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Material modules
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

//Components
import { MovieSessionsComponent } from '@admin/pages/movie-sessions/movie-sessions.component';

@NgModule({
  declarations: [
    MovieSessionsComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class MovieSessionsModule {
}
