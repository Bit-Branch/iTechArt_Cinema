export interface SelectableComponent<T> {
  component: T,
  indexInSelectableList: number
}

export interface SelectedItem<T> {
  item: SelectableComponent<T>,
  /**
   * the item was selected by pressing shift key
   */
  selectedWithShift: boolean,
  /**
   * the item was selected by pressing ctrl key
   */
  selectedWithCtrl: boolean
}
