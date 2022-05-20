//Angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DragDropModule } from '@angular/cdk/drag-drop';

//Material modules
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';

//Components
import { SeatComponent } from './components/seat/seat.component';
import { SofaComponent } from '@shared/elements/seating-plan/components/sofa/sofa.component';
import { SeatingPlanComponent } from '@shared/elements/seating-plan/seating-plan.component';
import { CinemaScreenComponent } from '@shared/elements/seating-plan/components/cinema-screen/cinema-screen.component';
import { RoundTableComponent } from '@shared/elements/seating-plan/components/round-table/round-table.component';
import {
  ClickStopPropagationDirective
} from '@shared/elements/seating-plan/directives/click-stop-propagation.directive';
import {
  BasicSeatGroupComponent
} from '@shared/elements/seating-plan/components/basic-seat-group/basic-seat-group.component';

@NgModule({
  declarations: [
    SeatingPlanComponent,
    BasicSeatGroupComponent,
    SeatComponent,
    RoundTableComponent,
    CinemaScreenComponent,
    SofaComponent,
    ClickStopPropagationDirective
  ],
  exports: [
    SeatingPlanComponent, ClickStopPropagationDirective
  ],
  imports: [
    CommonModule,
    MatCardModule,
    DragDropModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    MatTooltipModule,
    MatSelectModule,
    FormsModule
  ]
})
export class SeatingPlanModule {
}
