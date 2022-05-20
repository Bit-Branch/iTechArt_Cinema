import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';

import { SeatingPlanEditorComponent } from '@admin/seating-plan-editor/seating-plan-editor.component';
import {
  MultipleSeatMenuComponent
} from '@admin/seating-plan-editor/components/multiple-seat-menu/multiple-seat-menu.component';
import {
  SingleSeatMenuComponent
} from '@admin/seating-plan-editor/components/single-seat-menu/single-seat-menu.component';
import { MultiSelectionService } from '@shared/elements/seating-plan/multi-select-feature/multi-selection.service';
import { SeatingPlanModule } from '@shared/elements/seating-plan/seating-plan.module';

@NgModule({
  declarations: [
    SeatingPlanEditorComponent,
    SingleSeatMenuComponent,
    MultipleSeatMenuComponent
  ],
  exports: [
    SeatingPlanEditorComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule,
    MatIconModule,
    MatSliderModule,
    MatInputModule,
    MatSelectModule,
    SeatingPlanModule
  ],
  providers: [MultiSelectionService]
})
export class SeatingPlanEditorModule {
}
