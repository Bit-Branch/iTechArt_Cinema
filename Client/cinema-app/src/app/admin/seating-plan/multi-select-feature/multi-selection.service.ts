import { fromEvent, map, mergeMap, Observable, Subject, Subscription } from 'rxjs';

import { Injectable, OnDestroy } from '@angular/core';

import { SelectableItem } from '@admin/seating-plan/multi-select-feature/selectable-item';
import { SelectableComponent, SelectedItem } from '@admin/seating-plan/multi-select-feature/selected-item';

@Injectable()
export class MultiSelectionService<T extends SelectableItem> implements OnDestroy {
  private selectableItemsSubscription!: Subscription;
  // used to calculate index of newly added selectable item
  private selectableCounter = 0;
  // used to remember index of last selected item
  private lastIndex = 0;
  private readonly selectableItemsSubject: Subject<Observable<SelectedItem<T>>> = new Subject<Observable<SelectedItem<T>>>();
  private readonly selectedItemsSubject: Subject<T[]> = new Subject<T[]>();
  private readonly selectableItems: SelectableComponent<T>[] = [];

  constructor() {
    this.initialize();
  }

  addNewItemToSelectableList(item: T): void {
    const newSelectableItem = { component: item, indexInSelectableList: this.selectableCounter++ };
    this.selectableItems.push(newSelectableItem);
    this.selectableItemsSubject.next(
      fromEvent(item.getNativeElement(), 'click')
        .pipe(
          map(
            (event) => {
              return {
                selectedWithShift: (event as MouseEvent).shiftKey,
                selectedWithCtrl: (event as MouseEvent).ctrlKey,
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
    this.selectableItems.forEach(item => item.component.unselect());
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
        mergeMap((value: Observable<SelectedItem<T>>) => value)
      )
      .subscribe(
        (selectedItem: SelectedItem<T>) => {
          // if shift is not pressed
          if (!selectedItem.selectedWithShift) {
            // if ctrl is not pressed
            if (!selectedItem.selectedWithCtrl) {
              // deselect all other items and select current
              this.deselectAll();
            }
            // change selection state of an item
            selectedItem.item.component.isSelected()
              ? selectedItem.item.component.unselect()
              : selectedItem.item.component.select();
            // remember the last index of an item
            this.lastIndex = selectedItem.item.indexInSelectableList;
          } else {
            // calculate the range of items we need to select
            // based on the current and the last item indexes.
            const start = selectedItem.item.indexInSelectableList;
            const end = this.lastIndex;
            const selectableRange = this.selectableItems.slice(Math.min(start, end), Math.max(start, end) + 1);
            // select each item in range
            selectableRange.forEach(current => current.component.select());
          }
          this.selectedItemsSubject.next(this.getAllSelected());
        }
      );
  }
}
