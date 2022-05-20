import { HttpParams } from '@angular/common/http';

import { TableCurrentState } from '@shared/elements/editable-table/interfaces/table-current-state';

export function convertTableCurrentStateToHttpParams(tableState: TableCurrentState): HttpParams {
  let params = new HttpParams()
    .set('page', tableState.pageIndex)
    .set('pageSize', tableState.pageSize)
    .set('ascending', tableState.ascending);
  if (tableState.sortingColumn) {
    params = params.set('sortingColumn', tableState.sortingColumn);
  }
  if (tableState.searchTerm) {
    params = params.set('searchTerm', tableState.searchTerm);
  }
  return params;
}
