import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';

import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { PaginationResult } from '@core/models/pagination-result/pagination-result';
import { TableCurrentState } from '@shared/elements/editable-table/interfaces/table-current-state';
import { TableColumn } from '../interfaces/table-column';

const editIcon = 'edit';
const deleteIcon = 'delete';
const defaultPaginationSizes = [10, 25, 50];
const defaultPageSize = 10;
const defaultEditColumnName = 'edit';

@Component({
  selector: 'app-editable-table',
  templateUrl: './editable-table.component.html',
  styleUrls: ['./editable-table.component.scss']
})
export class EditableTableComponent<K extends object, T extends Record<string, K>> implements OnInit, AfterViewInit {
  /**
   * Main datasource of the table
   */
  tableDataSource = new MatTableDataSource<T>([]);
  /**
   * Total number of data entries existing in database.
   * Used to set up max length of mat-paginator.
   */
  tableDataTotalCount = 0;
  /**
   * Column names that need to be displayed.
   */
  displayedColumns: string[] = [];
  /**
   * Column name used for displaying column with 'edit' and 'delete' buttons.
   */
  editColumn = defaultEditColumnName;
  @ViewChild(MatPaginator, { static: true }) matPaginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) matSort!: MatSort;
  @ViewChild('filteringInput', { read: ElementRef }) filteringInput!: ElementRef<HTMLInputElement>;
  /**
   * Is pagination available in the table.
   */
  @Input() isPageable = false;
  /**
   * Is filtering available in the table.
   */
  @Input() isFilterable = false;
  /**
   * Is table editable.
   */
  @Input() isEditable = false;
  /**
   * Icon name for displaying edit button control.
   */
  @Input() editActionIcon = editIcon;
  /**
   * Icon name for displaying delete button control.
   */
  @Input() deleteActionIcon = deleteIcon;
  /**
   * Columns that will be displayed.
   */
  @Input() tableColumns: TableColumn[] = [];
  /**
   * All available entries counts that will be displayed on the page.
   */
  @Input() paginationSizes: number[] = defaultPaginationSizes;
  /**
   * Default number of entries that will be displayed on the page.
   */
  @Input() defaultPageSize = defaultPageSize;
  /**
   * Function that will be called when user performs sorting.
   */
  @Output() sortingAction: EventEmitter<TableCurrentState> = new EventEmitter<TableCurrentState>();
  /**
   * Function that will be called when user navigates to another page or switches page size.
   */
  @Output() paginatingAction: EventEmitter<TableCurrentState> = new EventEmitter<TableCurrentState>();
  /**
   * Function that will be called when user performs filtering.
   */
  @Output() filteringAction: EventEmitter<TableCurrentState> = new EventEmitter<TableCurrentState>();
  /**
   * Function that will be called when user clicks 'edit' button.
   */
  @Output() editingAction: EventEmitter<T> = new EventEmitter<T>();
  /**
   * Function that will be called when user clicks 'delete' button.
   */
  @Output() deletingAction: EventEmitter<T> = new EventEmitter<T>();
  /**
   * Function that updates datasource data by returning it from the server
   */
  @Output() getDataFromServerFunction: EventEmitter<TableCurrentState> = new EventEmitter<TableCurrentState>();
  /**
   * State in which stored current info about table.
   * It includes current: page, page size, searching term, column in which sorting is performed, sorting direction.
   */
  private readonly tableCurrentState: TableCurrentState;

  @Input() set tableData(data: PaginationResult<T>) {
    this.tableDataSource.data = data.items;
    this.tableDataTotalCount = data.totalCountInDatabase;
  }

  constructor() {
    this.tableCurrentState = {
      pageIndex: 0,
      pageSize: this.defaultPageSize,
      ascending: false
    }
  }

  ngOnInit(): void {
    // obtain array of column names to display
    const columnNames = this.tableColumns.map((tableColumn: TableColumn) => tableColumn.name);
    // if table is available for editing
    if (this.isEditable) {
      // display all columns + column with 'edit' and 'delete' buttons
      this.displayedColumns = [...columnNames, this.editColumn];
    } else {
      // otherwise, display only user defined columns
      this.displayedColumns = columnNames;
    }
    this.tableDataSource.paginator = this.matPaginator;
    this.tableDataSource.sort = this.matSort;
  }

  ngAfterViewInit(): void {
    // set up filtering function with delay and unique values to prevent unnecessary requests to the server
    fromEvent<Event>(this.filteringInput.nativeElement, 'keyup')
      .pipe(
        // get entered by user value
        map(
          (event: Event) => (event.target as HTMLInputElement).value
        ),
        // delay for 1000 milliseconds
        debounceTime(1000),
        // if previous value is different from the current
        distinctUntilChanged()
      )
      .subscribe(
        // emit filtering function
        (searchTerm: string) => this.emitFilteringAction(searchTerm)
      );
    if (this.getDataFromServerFunction.observed) {
      // get data for displaying for the first time
      this.getDataFromServerFunction.emit(this.tableCurrentState);
    }
  }

  /**
   * Method for displaying element value by composite key
   * @param element Element that have nested key
   * @param dataKey Composite key (string like 'obj.nestedObjA.nestedObjB.nestedObjBPropertyToDisplay')
   */
  getNestedValue(element: T, dataKey: string): unknown {
    // split composite key by dot and go through an object until we get value
    return dataKey
      .split('.')
      .reduce(
        (result: object, key: string) => {
          return result ? result[key as keyof typeof result] : result;
        }, element
      );
  }

  emitSortingAction(sortParameters: Sort): void {
    sortParameters.active = this.tableColumns.find(column => column.name === sortParameters.active)?.dataKey ?? 'id';
    this.tableCurrentState.sortingColumn = sortParameters.active;
    this.tableCurrentState.ascending = sortParameters.direction === 'asc';
    // if user set sorting event manually
    if (this.sortingAction.observed) {
      // call user's method
      this.sortingAction.emit(this.tableCurrentState);
    } else if (this.getDataFromServerFunction.observed) {
      this.getDataFromServerFunction.emit(this.tableCurrentState);
    } else {
      // call default method for sorting columns
      this.sortData(sortParameters);
    }
  }

  emitPagingAction($event: PageEvent): void {
    this.tableCurrentState.pageIndex = $event.pageIndex;
    this.tableCurrentState.pageSize = $event.pageSize;
    if (this.paginatingAction.observed) {
      this.paginatingAction.emit(this.tableCurrentState);
    } else if (this.getDataFromServerFunction.observed) {
      this.getDataFromServerFunction.emit(this.tableCurrentState);
    }
  }

  emitEditingAction(row: T): void {
    if (this.editingAction.observed) {
      this.editingAction.emit(row);
    }
  }

  emitDeletingAction(row: T): void {
    if (this.deletingAction.observed) {
      this.deletingAction.emit(row);
    }
  }

  private emitFilteringAction(searchTerm: string): void {
    this.tableCurrentState.searchTerm = searchTerm;
    // if user set filtering event manually
    if (this.filteringAction.observed) {
      // call user's method
      this.filteringAction.emit(this.tableCurrentState);
    } else if (this.getDataFromServerFunction.observed) {
      this.getDataFromServerFunction.emit(this.tableCurrentState);
    } else {
      // call default method for filtering data
      this.filterData(searchTerm);
    }
  }

  /**
   * Default method for filtering data (if user isn't defined any other)
   * @param searchTerm Term to filter with
   * @private
   */
  private filterData(searchTerm: string): void {
    this.tableDataSource.filter = searchTerm.trim().toLowerCase();
  }

  /**
   * Default method for sorting data (if user isn't defined any other)
   * @param sortParameters Current sort state
   * @private
   */
  private sortData(sortParameters: Sort): void {
    const keyName = sortParameters.active as keyof T;
    if (sortParameters.direction === 'asc') {
      this.tableDataSource.data
        .sort(
          (a: T, b: T) => a[keyName].toString().localeCompare(b[keyName].toString())
        );
    } else if (sortParameters.direction === 'desc') {
      this.tableDataSource.data
        .sort(
          (a: T, b: T) => b[keyName].toString().localeCompare(a[keyName].toString())
        );
    }
  }
}
