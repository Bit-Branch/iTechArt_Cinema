//External modules
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

//Angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DragDropModule } from '@angular/cdk/drag-drop';

//Material modules
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

//Components
import { HallDialogComponent } from '@admin/dialogs/hall-dialog/hall-dialog.component';
import { SeatingPlanModule } from '@admin/seating-plan/seating-plan.module';

@NgModule({
  declarations: [HallDialogComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    DragDropModule,
    MatDialogModule,
    NgxMatSelectSearchModule,
    MatChipsModule,
    SeatingPlanModule
  ]
})
export class HallDialogModule {
}
