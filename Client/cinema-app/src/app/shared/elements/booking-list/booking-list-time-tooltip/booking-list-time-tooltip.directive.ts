import { ComponentRef, Directive, ElementRef, HostListener, Input, OnInit, TemplateRef } from '@angular/core';

import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay';

import {
  BookingListTimeTooltipComponent
} from '@shared/elements/booking-list/booking-list-time-tooltip/booking-list-time-tooltip.component';

@Directive({
  selector: '[appBookingListTimeTooltip]'
})
export class BookingListTimeTooltipDirective implements OnInit {
  /**
   * Is tooltip need to be shown
   */
  @Input() showToolTip: boolean = true;
  /**
   * Text that will be rendered in the tooltip
   * Note: if template is specified - text will not be rendered
   */
  @Input(`appBookingListTimeTooltip`) text: string | undefined;
  /**
   * Template (ng-template) that will be rendered in the tooltip
   * <ng-template #template>
   *  some content...
   * </ng-template>
   */
  @Input() contentTemplate: TemplateRef<unknown> | undefined;

  private overlayRef: OverlayRef | undefined;

  constructor(
    private readonly overlay: Overlay,
    private readonly overlayPositionBuilder: OverlayPositionBuilder,
    private readonly elementRef: ElementRef
  ) {
  }

  ngOnInit() {
    if (this.showToolTip) {
      const positionStrategy = this.overlayPositionBuilder
        .flexibleConnectedTo(this.elementRef)
        .withPositions([
          {
            originX: 'center',
            originY: 'bottom',
            overlayX: 'center',
            overlayY: 'top',
            offsetY: 5
          }
        ]);
      this.overlayRef = this.overlay.create({ positionStrategy });
    }
  }

  @HostListener('mouseenter')
  show(): void {
    //attach the component if it has not already attached to the overlay
    if (this.overlayRef && !this.overlayRef.hasAttached()) {
      const tooltipRef: ComponentRef<BookingListTimeTooltipComponent> = this.overlayRef.attach(new ComponentPortal(
        BookingListTimeTooltipComponent));
      tooltipRef.instance.text = this.text;
      tooltipRef.instance.contentTemplate = this.contentTemplate;
    }
  }

  @HostListener('mouseleave')
  hide(): void {
    this.closeToolTip();
  }

  ngOnDestroy() {
    this.closeToolTip();
  }

  private closeToolTip() {
    if (this.overlayRef) {
      this.overlayRef.detach();
    }
  }
}
