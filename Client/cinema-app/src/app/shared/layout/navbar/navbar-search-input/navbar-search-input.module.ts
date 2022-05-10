import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { NavbarSearchInputComponent } from '@shared/layout/navbar/navbar-search-input/navbar-search-input.component';

@NgModule({
  declarations: [NavbarSearchInputComponent],
  exports: [NavbarSearchInputComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatAutocompleteModule
  ]
})
export class NavbarSearchInputModule {
}
