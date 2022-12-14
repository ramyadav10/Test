import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth.service';
import { CoordinatorService } from 'src/app/service/coordinator.service';
import { UtilityService } from 'src/app/service/utility.service';
import { ProfilePicComponent } from '../profile-pic/profile-pic.component';

@Component({
  selector: 'app-coordinator-dialog',
  templateUrl: './coordinator-dialog.component.html',
  styleUrls: ['./coordinator-dialog.component.scss'],
})
export class CoordinatorDialogComponent implements OnInit {
  public coordinatorDetails: FormGroup;
  operation: any = 'add';

  constructor(
    private dialogRef: MatDialogRef<CoordinatorDialogComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder,
    private utility: UtilityService,
    private coordinatorService: CoordinatorService,
    private authService: AuthService
  ) {
    this.coordinatorDetails = this.fb.group({
      firstName: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('[a-zA-Z ]*'),
        ]),
      ],
      lastName: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('[a-zA-Z ]*'),
        ]),
      ],
      mobileNo: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
          Validators.pattern('[6-9]{1}[0-9]{9}'),
        ]),
      ],
      secondaryMobileNo: [
        '',
        Validators.compose([
          Validators.maxLength(10),
          Validators.minLength(10),
          Validators.pattern('[6-9]{1}[0-9]{9}'),
        ]),
      ],
      emailId: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(
            '^([a-zA-Z0-9][.-]?)+@([a-zA-Z0-9]+[.-]?)*[a-zA-Z0-9][.][a-zA-Z]{2,3}$'
          ),
        ]),
      ],
      // status: ['ACTIVE'],
    });
    if (data !== null) {
      debugger;
      this.operation = data.operation;
      this.coordinatorDetails.patchValue({
        firstName: data.data.firstName,
        lastName: data.data.lastName,
        mobileNo: data.data.mobileNo,
        secondaryMobileNo: data.data.secondaryMobileNo || '',
        emailId: data.data.emailId,
        // status: data.data.status,
      });
      this.imageSource = data.data.profileImg;
    }
  }

  imageSource: any = null;
  profileImage!: String;
  disable: boolean = false;

  ngOnInit() {}

  addCoordinator() {
    if (this.coordinatorDetails.invalid) {
      this.utility.markFormGroupTouched(this.coordinatorDetails);
    } else {
      this.utility.openLoader();
      if (this.authService.isAuthorised()) {
        let token = localStorage.getItem('token');
        this.coordinatorService
          .addCoordinator(this.coordinatorDetails.value, token)
          .subscribe(
            (response) => {
              if (response.statusCode === 201) {
                setTimeout(() => {
                  this.dialogRef.close();
                  this.utility.closeLoader();
                  this.utility.showToast('SUCCESS', response.message);
                }, 1000);
              }
            },
            (err) => {
              if (err.error && err.error.statuscode === 409) {
                setTimeout(() => {
                  this.utility.closeLoader();
                  this.utility.showToast('ERROR', err.error.message);
                }, 1000);
              } else if (err.error && err.error.statuscode === 400) {
                setTimeout(() => {
                  this.utility.closeLoader();
                  this.utility.showToast('ERROR', err.error.message);
                }, 1000);
              } else {
                setTimeout(() => {
                  this.utility.closeLoader();
                  this.utility.errorHandler(err);
                }, 1000);
              }
            }
          );
      }
    }
  }

  updateCoordinator() {
    if (this.coordinatorDetails.invalid) {
      this.utility.markFormGroupTouched(this.coordinatorDetails);
    } else {
      this.utility.openLoader();
      if (this.authService.isAuthorised()) {
        let token = localStorage.getItem('token');
        this.coordinatorService        
          .updateCoordinator(this.coordinatorDetails.value, this.data.data.id, token)
          .subscribe(
            (response) => {
              console.log(response);
              
              if (response.statusCode === 200) {
                setTimeout(() => {
                  this.dialogRef.close();
                this.utility.closeLoader();
                this.utility.showToast('SUCCESS',response.message);
                }, 1000);
              }
            },
            (err) => {
              if (err.error && err.error.statusCode === 409) {
                setTimeout(() => {
                  this.utility.closeLoader();
                  this.utility.showToast('ERROR', err.error.message);
                }, 1000);
              } else if (err.error && err.error.statusCode === 400) {
                setTimeout(() => {
                  this.utility.closeLoader();
                  this.utility.showToast('ERROR', err.error.message);
                }, 1000);
              } else {
                setTimeout(() => {
                  this.utility.closeLoader();
                  this.utility.errorHandler(err);
                }, 1000);
              }
            }
          );
      }
    }
  }

  getErrorMessage(control: any, alias: string) {
    if (control.errors) {
      if (control.errors['required']) {
        return alias + ' is required';
      }

      if (control.errors['pattern'] || control.errors['whitespace']) {
        return 'Invalid ' + alias.toLowerCase();
      }
      if (control.errors['pattern'] || control.errors['whitespace']) {
        return 'Invalid ' + alias.toLowerCase();
      } else {
        return '';
      }
    }
    return null;
  }

  closeDialog() {
    this.dialogRef.close('close');
  }

  editProfilePic() {
    const dialogRef = this.dialog.open(ProfilePicComponent, {
      disableClose: true,
      autoFocus: true,
      width: '700px',
      panelClass: 'image-cropper-dialog',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== '') {
        this.imageSource = result.cropedImg.base64;
        this.profileImage = result.image;
      }
    });
  }
}
