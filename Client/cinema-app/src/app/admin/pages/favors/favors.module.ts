//Angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Material modules
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

//Components
import { FavorsComponent } from '@admin/pages/favors/favors.component';

@NgModule({
  declarations: [
    FavorsComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class FavorsModule {
}
