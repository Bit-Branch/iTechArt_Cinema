import { MatDialogConfig } from '@angular/material/dialog';

export const dialogsConfig: MatDialogConfig = {
  disableClose: true,
  autoFocus: true,
  width: '90%',
  height: '90%'
};

export const fullScreenDialogsConfig: MatDialogConfig = {
  maxWidth: '100vw',
  maxHeight: '100vh',
  height: '100%',
  width: '100%',
  panelClass: 'full-screen-modal'
}
