import { Component } from '@angular/core';

import { animations } from './sidenav-animations';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: animations
})
export class SidenavComponent {
  isShowing = false;
  linkText = false;

  mouseenter() {
    this.isShowing = true;
    setTimeout(() => this.linkText = this.isShowing, 200);
  }

  mouseleave() {
    this.isShowing = false;
    this.linkText = false;
  }
}
