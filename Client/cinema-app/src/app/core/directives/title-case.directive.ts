import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appTitleCase]'
})
export class TitleCaseDirective {
  constructor(private el: ElementRef) {
  }

  @HostListener('blur') onBlur() {
    if (this.el.nativeElement.value) {
      const first = this.el.nativeElement.value.slice(0, 1).toUpperCase();
      this.el.nativeElement.value = first + this.el.nativeElement.value.slice(1);
    }
  }
}
