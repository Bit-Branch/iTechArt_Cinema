export interface SelectableComponent<T> {
  component: T,
  index: number
}

export interface Selected<T> {
  item: SelectableComponent<T>,
  /**
   * the item was selected by pressing shift key
   */
  isShift: boolean,
  /**
   * the item was selected by pressing ctrl key
   */
  isCtrl: boolean
}
