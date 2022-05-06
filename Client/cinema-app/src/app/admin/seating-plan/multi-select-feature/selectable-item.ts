export interface SelectableItem {
  getNativeElement: () => Element;
  isSelected: () => boolean;
  select: () => void;
  unselect: () => void;
}
