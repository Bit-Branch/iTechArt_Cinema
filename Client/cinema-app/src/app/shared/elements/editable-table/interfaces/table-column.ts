import { PipeTransform, Type } from '@angular/core';

/**
 * Interface that defines column for data using editable-table component
 */
export interface TableColumn {
  /**
   * Column name
   */
  name: string,
  /**
   * Name of the key of the actual data in this column
   */
  dataKey: string,
  /**
   * Is dataKey represents key path, so we can display nested object property value
   * (string like 'obj.nestedObjA.nestedObjB.nestedObjBPropertyToDisplay')
   */
  isNestedKey?: boolean,
  /**
   * Should it be right-aligned or left-aligned
   */
  position?: 'right' | 'left',
  /**
   * Can a column be sorted
   */
  isSortable?: boolean,
  /**
   * Is it contains image url or image base64 data, so we can display this column value as image inside column
   */
  containsImageUrlOrBase64Data?: boolean,
  /**
   * Pipe that need to be applied for this column (pipe and it's parameters, if needed)
   */
  pipe?: { pipe: Type<PipeTransform>, pipeArguments?: unknown[] }
}
