import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoadingComponent } from '../component/loading/loading.component';
import { ToastType } from '../model/ToastType.enum';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  dialogRef!: MatDialogRef<LoadingComponent, any>;
  private token: string = '';
  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  openLoader() {
    this.dialogRef = this.dialog.open(LoadingComponent, {
      disableClose: true,
      panelClass: 'loader-style',
    });
  }

  closeLoader() {
    this.dialogRef.close();
  }

  showToast(type: string, message: string) {
    this._snackBar.open(message, '', {
      duration: 2500,
      panelClass: String(type),
    });
  }

  errorHandler(error: { error: { message: string; status: any } }) {
    this.showToast(ToastType['ERROR'], error.error.message);

    let code = error.error.status;
    if (code == 104 || code == 103) {
      this.router.navigateByUrl('/');
    }
  }

  /**
   * Marks all controls in a form group as touched
   * @param formGroup - The form group to touch
   */
  public markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: FormGroup) => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
