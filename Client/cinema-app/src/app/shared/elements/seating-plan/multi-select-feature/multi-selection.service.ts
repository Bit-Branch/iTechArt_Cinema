import { fromEvent, map, mergeMap, Observable, Subject, Subscription } from 'rxjs';

import { Injectable, OnDestroy } from '@angular/core';

import { SelectableItem } from '@shared/elements/seating-plan/multi-select-feature/selectable-item';
import { SelectableComponent, Selected } from '@shared/elements/seating-plan/multi-select-feature/selected';

@Injectable()
export class MultiSelectionService<T extends SelectableItem> implements OnDestroy {
  private selectableItemsSubscription!: Subscription;
  // used to calculate index of newly added selectable item
  private selectableCounter = 0;
  // used to remember index of last selected item
  private lastIndex = 0;
  private readonly selectableItemsSubject: Subject<Observable<Selected<T>>> = new Subject<Observable<Selected<T>>>();
  private readonly selectedItemsSubject: Subject<T[]> = new Subject<T[]>();
  private readonly selectableItems: SelectableComponent<T>[] = [];

  constructor() {
    this.initialize();
  }

  addNewItemToSelectableList(item: T): void {
    const newSelectableItem = { component: item, index: this.selectableCounter++ };
    this.selectableItems.push(newSelectableItem);
    this.selectableItemsSubject.next(
      fromEvent(item.getNativeElement(), 'click')
        .pipe(
          map(
            (event) => {
              return {
                isShift: (event as MouseEvent).shiftKey,
                isCtrl: (event as MouseEvent).ctrlKey,
                item: newSelectableItem
              };
            }
          )
        )
    );
  }

  get selectedItems$(): Observable<T[]> {
    return this.selectedItemsSubject.asObservable();
  }

  get selectedCount(): number {
    return this.getAllSelected().length;
  }

  deselectAll(): void {
    this.selectableItems.forEach(item => item.component.setStatusToNotSelected());
  }

  ngOnDestroy(): void {
    this.selectableItemsSubscription.unsubscribe();
  }

  private getAllSelected(): T[] {
    return this.selectableItems
      .filter(item => item.component.isSelected())
      .map(value => value.component);
  }

  private initialize(): void {
    this.selectableItemsSubscription = this.selectableItemsSubject
      .pipe(
        mergeMap((value: Observable<Selected<T>>) => value)
      )
      .subscribe(
        (selectedItem: Selected<T>) => {
          // if shift is not pressed
          if (!selectedItem.isShift) {
            // if ctrl is not pressed
            if (!selectedItem.isCtrl) {
              // deselect all other items and select current
              this.deselectAll();
            }
            // change selection state of an item
            selectedItem.item.component.isSelected()
              ? selectedItem.item.component.setStatusToNotSelected()
              : selectedItem.item.component.setStatusToSelected();
            // remember the last index of an item
            this.lastIndex = selectedItem.item.index;
          } else {
            // calculate the range of items we need to select
            // based on the current and the last item indexes.
            const start = selectedItem.item.index;
            const end = this.lastIndex;
            const selectableRange = this.selectableItems.slice(Math.min(start, end), Math.max(start, end) + 1);
            // select each item in range
            selectableRange.forEach(current => current.component.setStatusToSelected());
          }
          this.selectedItemsSubject.next(this.getAllSelected());
        }
      );
  }
}
