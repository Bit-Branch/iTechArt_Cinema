import { Component } from '@angular/core';

import { animations, sidenavOpenAnimationTimeInMilliseconds } from './sidenav-animations';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: animations
})
export class SidenavComponent {
  isShowing = false;
  linkText = false;

  showSidenav() {
    this.isShowing = true;
    //show text of sidenav menu after open/close animation was played
    setTimeout(() => this.linkText = this.isShowing, sidenavOpenAnimationTimeInMilliseconds + 50);
  }

  hideSidenav() {
    this.isShowing = false;
    this.linkText = false;
  }
}
