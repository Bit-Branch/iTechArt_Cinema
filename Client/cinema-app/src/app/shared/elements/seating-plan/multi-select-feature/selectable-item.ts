export interface SelectableItem {
  getNativeElement: () => Element;
  isSelected: () => boolean;
  setStatusToSelected: () => void;
  setStatusToNotSelected: () => void;
}
