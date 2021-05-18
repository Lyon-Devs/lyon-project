import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { ErrorComponent } from '../../components/error/error.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(
    public dialog: MatDialog
  ) { }

  public traitError(errors: any): void {
    this.dialog.open(ErrorComponent, {
      width: '500px',
      data: {
        errors: this.treatment(errors)
      }
    });
  }

  public treatment(errors: any, tags: boolean = false): string {
    let messageErrors = '';
    if (typeof errors === 'string') {
      return errors;
    }
    for (const error of Object.entries(errors)) {
      if (typeof error[1] === 'object') {
        const msg = Object.values(error[1]);

        msg.forEach(item => {
          messageErrors += `<p>${item}</p>`;
        });
      } else {
        messageErrors += tags ? `<p>${error[1][0]}</p>` : `${error[1][0]}</br>`;

      }
    }
    return messageErrors;
  }
}
