import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ProfilePicComponent } from '../profile-pic/profile-pic.component';
import { MentorService } from 'src/app/service/mentor.service';
import { UtilityService } from 'src/app/service/utility.service';
@Component({
  selector: 'app-techstack-dialog',
  templateUrl: './techstack-dialog.component.html',
  styleUrls: ['./techstack-dialog.component.scss']
})
export class TechstackDialogComponent implements OnInit {
  imageSource: any = null;
  profileImage: any = null;
  techStackForm: FormGroup;
  operation: any = "add";
  constructor(public dialogRef: MatDialogRef<TechstackDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog, private formBuilder: FormBuilder, private mentorService: MentorService, private utility: UtilityService) {
    // this.utility.openLoader();
    this.techStackForm = this.formBuilder.group({
      techTypeName: ["", [Validators.required, Validators.pattern('[a-zA-Z .-/\]*'), Validators.minLength(3)]],

    });
    if (data !== null) {
      this.operation = data.operation;
      this.techStackForm.patchValue({
        techTypeName: data.data.techname,

      });
      this.image = data.data.imagePath;
    }
  }

  image;
  ngOnInit() {
  }

  closeDialog(){
    this.dialogRef.close('close');
  }

  closetechstack(): void {
    this.dialogRef.close();
  }
  getErrorForTechTypeName() {
    return this.techStackForm.get('techTypeName')?.hasError('required') ? 'Tech Name Cannot be blank' :
      this.techStackForm.get('techTypeName')?.hasError('minlength') ? 'Minimun 3 digit required' :
        this.techStackForm.get('techTypeName')?.hasError('pattern') ? "Enter valid name" :
          '';
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
        this.image = result.image.name;
      }
    });
  }



  createTechStack() {
    debugger
    if (this.techStackForm.invalid) {
      this.utility.markFormGroupTouched(this.techStackForm);
    } else {
      const formData = new FormData();
      console.log('profile image',this.profileImage);
      
      formData.append('file', this.profileImage);
      this.utility.openLoader();
      console.log('formdata',formData);
      console.log('whole data',this.techStackForm.value.techTypeName);
      
      this.mentorService.createTechStack(formData, this.techStackForm.value.techTypeName)
        .subscribe((response: any) => {
          if ((response as any).status == 200) {
            this.dialogRef.close();
            this.utility.closeLoader();
            this.utility.showToast('SUCCESS', (response as any).message);
          }
        }, (err: { error: { statuscode: number; message: string; }; }) => {
          if (err.error && err.error.statuscode !== 200) {
            this.utility.showToast('ERROR', err.error.message);
            this.utility.closeLoader();
          } else {
            this.utility.closeLoader();
            this.utility.showToast('ERROR', 'Please Try Again Later!!');
          }
        });
    }
  }
  updateTechStack() {
    let reqData = {
      'techTypeName': this.techStackForm.value.techTypeName,
      'file': this.profileImage
    }
     this.utility.openLoader();
    this.mentorService.updateTechStack(this.data.data.id, reqData,)
      .subscribe(response => {
        if ((response as any).status === 200) {
          this.dialogRef.close();
          this.utility.closeLoader();
          this.utility.showToast('SUCCESS', (response as any).message);
        }
      }, err => {
        if (err.error && err.error.statuscode !== 200) {
          this.utility.showToast('ERROR', err.error.message);
          this.utility.closeLoader();
        } else {
          this.utility.closeLoader();
          this.utility.showToast('ERROR', 'Please Try Again Later!!');
        }
      });
      //  window.location.reload();
  }

}