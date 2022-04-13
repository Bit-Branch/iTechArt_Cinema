import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { TableColumn } from '../interfaces/table-column';

const editIcon = 'edit';
const deleteIcon = 'delete';

@Component({
  selector: 'app-editable-table',
  templateUrl: './editable-table.component.html',
  styleUrls: ['./editable-table.component.scss']
})
export class EditableTableComponent<K extends object, T extends Record<string, K>> implements OnInit, AfterViewInit {
  tableDataSource = new MatTableDataSource<T>([]);
  displayedColumns: string[] = [];
  editColumn = 'edit';
  @ViewChild(MatPaginator, { static: false }) matPaginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) matSort!: MatSort;
  @Input() isPageable = false;
  @Input() isFilterable = false;
  @Input() isEditable = false;
  @Input() editActionIcon = editIcon;
  @Input() deleteActionIcon = deleteIcon;
  @Input() tableColumns: TableColumn[] = [];
  @Input() paginationSizes: number[] = [5, 10, 15];
  @Input() defaultPageSize = this.paginationSizes[1];
  @Output() sortAction: EventEmitter<Sort> = new EventEmitter<Sort>();
  @Output() editAction: EventEmitter<T> = new EventEmitter<T>();
  @Output() deleteAction: EventEmitter<T> = new EventEmitter<T>();

  @Input() set tableData(data: T[]) {
    this.tableDataSource.data = data;
  }

  ngOnInit(): void {
    const columnNames = this.tableColumns.map((tableColumn: TableColumn) => tableColumn.name);
    if (this.isEditable) {
      this.displayedColumns = [...columnNames, this.editColumn];
    } else {
      this.displayedColumns = columnNames;
    }
  }

  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.matPaginator;
    this.tableDataSource.sort = this.matSort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableDataSource.filter = filterValue.trim().toLowerCase();
  }

  sortTable(sortParameters: Sort): void {
    sortParameters.active = this.tableColumns.find(column => column.name === sortParameters.active)?.dataKey ?? 'id';
    // if user set sort event manually
    if (this.sortAction.observed) {
      // call user's method
      this.sortAction.emit(sortParameters);
    } else {
      // call default method for sorting columns
      this.sortData(sortParameters);
    }
  }

  /**
   * Method for displaying element value by composite key
   * @param element Element that have nested key
   * @param dataKey Composite key (string like 'obj.nestedObjA.nestedObjB.nestedObjBPropertyToDisplay')
   */
  getNestedValue(element: T, dataKey: string): unknown {
    // split composite key by dot and go through an object until we get value
    return dataKey.split('.').reduce((result: object, key: string) => {
      return result[key as keyof typeof result];
    }, element);
  }

  emitEditAction(row: T) {
    this.editAction.emit(row);
  }

  emitDeleteAction(row: T) {
    this.deleteAction.emit(row);
  }

  /**
   * Default method for sorting data (if user isn't defined any other)
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
