import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-admin-edit-page',
  templateUrl: './admin-edit-page.component.html'
})
export class AdminEditPageComponent {
  @Input() title = '';
}
