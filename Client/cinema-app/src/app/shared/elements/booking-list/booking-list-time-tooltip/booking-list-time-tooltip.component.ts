import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-booking-list-time-tooltip',
  templateUrl: './booking-list-time-tooltip.component.html',
  styleUrls: ['./booking-list-time-tooltip.component.scss']
})
export class BookingListTimeTooltipComponent {
  /**
   * Simple text that will be shown if content template is not specified
   */
  @Input() text: string | undefined;
  /**
   * Template (ng-template) that will be shown inside tooltip.
   * <ng-template #template>
   *  some content...
   * </ng-template>
   */
  @Input() contentTemplate: TemplateRef<unknown> | undefined;
}
