import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth.service';
import { UtilityService } from 'src/app/service/utility.service';
import { ProfilePicComponent } from '../profile-pic/profile-pic.component';
import { HiringService } from 'src/app/service/hiring.service';

@Component({
  selector: 'app-learners-update-dialog',
  templateUrl: './learners-update-dialog.component.html',
  styleUrls: ['./learners-update-dialog.component.scss']
})
export class LearnersUpdateDialogComponent implements OnInit {

  public candidateDetails: FormGroup;
  tab: any;
  constructor(private dialogRef: MatDialogRef<LearnersUpdateDialogComponent>, public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder, private utility: UtilityService,
    private hiringService: HiringService,
    private authService: AuthService) {

    this.candidateDetails = this.fb.group({
      cicId: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z0-9- ]*')
      ])],
      fullName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')
      ])],
      phnNumber: ['', Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(10),
      Validators.pattern('[6-9]{1}[0-9]{9}')])],

      email: ['', Validators.compose([Validators.required, Validators.maxLength(50),
      Validators.pattern('^([a-zA-Z0-9][.-]?)+@([a-zA-Z0-9]+[.-]?)*[a-zA-Z0-9][.][a-zA-Z]{2,3}$')])],

      degree: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.pattern('[a-zA-Z-/ \.]*')
      ])],

      aggrPer: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.pattern(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/)
      ])],

      passedOutYear: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern('[0-9]*')
      ])],
      city: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')
      ])],
      state: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')
      ])],
      preferredJobLocation: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')
      ])],
      changeStatus: [''],
    })
    if (data !== null)
      this.tab = data.tabType;

    this.candidateDetails.patchValue({
      id: data.id,
      cicId: data.cicId,
      fullName: data.fullName,
      phnNumber: data.mobileNum,
      email: data.email,
      degree: data.degree,
      aggrPer: data.aggrPer,
      passedOutYear: data.passedOutYear,
      city: data.city,
      state: data.state,
      preferredJobLocation: data.preferredJobLocation,
    })
    this.imageSource = data.profileImg
  }

  imageSource: any = null;
  profileImage!: File;
  disable: boolean = false;

  ngOnInit() {

  }
  getErrorMessage(control: FormControl, alias: string) {
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
        return ''
      }


    }
    return ''
  }
  closeDialog() {
    this.dialogRef.close('close');
  }
  editProfilePic() {
    const dialogRef = this.dialog.open(ProfilePicComponent, {
      disableClose: true,
      autoFocus: true,
      width: '700px',
      panelClass: 'image-cropper-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result !== '') {

        this.imageSource = result.cropedImg.base64
        this.profileImage = result.image

      }
    });
  }

  updateCandidate() {
    if (this.candidateDetails.invalid) {
      this.utility.markFormGroupTouched(this.candidateDetails);
    } else {
      this.utility.openLoader();
      if (this.authService.isAuthorised()) {

        let token = localStorage.getItem('token');
        const data = {
          'id': this.data.id,
          'cicId': this.candidateDetails.value.cicId,
          'fullName': this.candidateDetails.value.fullName,
          'mobileNum': this.candidateDetails.value.phnNumber,
          'email': this.candidateDetails.value.email,
          'degree': this.candidateDetails.value.degree,
          'aggrPer': this.candidateDetails.value.aggrPer,
          'passedOutYear': this.candidateDetails.value.passedOutYear,
          'city': this.candidateDetails.value.city,
          'state': this.candidateDetails.value.state,
          'preferredJobLocation': this.candidateDetails.value.preferredJobLocation,
          'candidateStatus': this.data.candidateStatus
          // 'file':this.profileImage  
        }

        this.hiringService.updateCandidate(data).subscribe(response => {
          if ((response as any).status == 200) {
            setTimeout(() => {
              this.dialogRef.close();
              this.utility.closeLoader();
              this.utility.showToast('SUCCESS', (response as any).message);
            }, 1000)
          }
        }, err => {
          if (err.error && err.error.statuscode == 409) {
            setTimeout(() => {
              this.utility.closeLoader();
              this.utility.showToast('ERROR', err.error.message);
            }, 1000)
          } else if (err.error && err.error.statuscode == 400) {
            setTimeout(() => {
              this.utility.closeLoader();
              this.utility.showToast('ERROR', err.error.message);
            }, 1000)
          }
          else {
            setTimeout(() => {
              this.utility.closeLoader();
              this.utility.errorHandler(err);
            }, 1000)
          }
        });
      }
    }
  }
}

