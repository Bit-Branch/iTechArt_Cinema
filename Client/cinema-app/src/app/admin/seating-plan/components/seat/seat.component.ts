import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';


import { Seat } from '@core/models/seat/seat';
import { AvailableSeatType } from '@admin/seating-plan/intefraces/available-seat-type';
import { MultiSelectionService } from '@admin/seating-plan/multi-select-feature/multi-selection.service';
import { SelectableItem } from '@admin/seating-plan/multi-select-feature/selectable-item';
import { SeatMenuManagerService } from '@admin/seating-plan/services/seat-menu-manager.service';
import { SeatingPlanSharedStateService } from '@admin/seating-plan/services/seating-plan-shared-state.service';

@Component({
  selector: 'app-seat',
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeatComponent implements SelectableItem, OnInit, AfterViewInit, OnDestroy {
  @Input() seatId = -1;
  @Input() seatGroupId = -1;
  /**
   * function for adding current seat component to seats array of parent seat group component
   */
  @Output() addSeatToParent = new EventEmitter();
  /**
   * seat associated with this component
   */
  seat: Seat = { rowName: '', seatNo: -1, indexInsideSeatGroup: -1, seatGroupId: -1, seatTypeId: -1 };
  /**
   * color of current seat (color can be changed when we change seat type of this seat)
   */
  currentSeatColor: string | undefined;
  /**
   * is seat was selected by user (shift+click or ctrl+click or just mouse click)
   */
  private selected = false;
  /**
   * is seat was disabled by user
   */
  private disabled = false;

  get isDisabled(): boolean {
    return this.disabled;
  }

  set isDisabled(isDisabled: boolean) {
    if (isDisabled) {
      this.sharedStateService.removeSeatFromSharedState(this.seat);
      this.disabled = true;
    } else {
      this.sharedStateService.addSeatToSharedState(this.seat);
      this.disabled = false;
    }
  }

  constructor(
    private readonly sharedStateService: SeatingPlanSharedStateService,
    private readonly seatMenuManagerService: SeatMenuManagerService,
    private readonly multiSelectService: MultiSelectionService<SeatComponent>,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly host: ElementRef
  ) {
  }

  ngOnInit(): void {
    // add current seat to 'available for selection' seats array
    this.multiSelectService.addNewItemToSelectableList(this);
    // add current seat to shareable seats array, so it will be able to get all seats in hall-dialog component
    this.sharedStateService.addSeatToSharedState(this.seat);
    this.addSeatToParent.emit(this);
  }

  ngAfterViewInit(): void {
    this.seat.seatGroupId = this.seatGroupId;
    this.seat.indexInsideSeatGroup = this.seatId;
  }

  ngOnDestroy(): void {
    this.sharedStateService.removeSeatFromSharedState(this.seat);
  }

  get seatNumber(): string {
    // if values for seat row and number is not set - leave seat label empty
    return (this.seat.rowName !== '' && this.seat.seatNo !== 0) ? this.seat.rowName + this.seat.seatNo : '';
  }

  /**
   *  change seat type for the current seat if new one was selected
   */
  changeCurrentSeatType(availableSeatType: AvailableSeatType): void {
    this.seat.seatTypeId = availableSeatType?.seatType.id;
    // also change color of this seat component accordingly to the selected seat type
    this.currentSeatColor = availableSeatType?.color;
  }

  openEditMenu($event: MouseEvent): void {
    $event.preventDefault();
    this.multiSelectService.selectedCount > 1
      ? this.seatMenuManagerService.openMultipleSeatMenu($event)
      : this.seatMenuManagerService.openSingleSeatMenu($event);
  }

  /**
   * mark seat to be checked by change detection
   */
  markForChangeDetectionCheck(): void {
    this.changeDetectorRef.markForCheck();
  }

  // SelectableItem interface implementation
  getNativeElement(): Element {
    return this.host.nativeElement;
  }

  isSelected(): boolean {
    return this.selected;
  }

  select(): void {
    this.selected = true;
    this.changeDetectorRef.markForCheck();
  }

  unselect(): void {
    this.selected = false;
    this.changeDetectorRef.markForCheck();
  }
}
