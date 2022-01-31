import { Component, ViewChild } from '@angular/core';

import { MatSidenav } from '@angular/material/sidenav';

import { animations } from './sidenav-animations';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: animations
})
export class SidenavComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  showSubmenu = false;
  isShowing = false;
  linkText = false;

  mouseenter() {
    this.isShowing = true;
    setTimeout(() => {
      this.linkText = this.isShowing;
    }, 200);
  }

  mouseleave() {
    this.isShowing = false;
    this.linkText = false;
  }

}
