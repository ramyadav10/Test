import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ProfilePicComponent } from '../profile-pic/profile-pic.component';


const person = {
  username: 'vijay',
  emailid: 'HRUser@bridgelabz.com'
};

@Component({
  selector: 'app-editProfile',
  templateUrl: './editProfile.component.html',
  styleUrls: ['./editProfile.component.scss']
})
export class EditProfileComponent implements OnInit {

  username = new FormControl(person.username, [Validators.required, Validators.pattern('^([a-zA-Z]).*')]);
  emailid = new FormControl(person.emailid, [Validators.required, Validators.email]);
  imageSource : any = null;
  constructor(@Inject(MAT_DIALOG_DATA) private data: String,
  private dialogRef: MatDialogRef<EditProfileComponent>,
  public dialog: MatDialog) { }

  ngOnInit() {
  }
  close() {
    this.dialogRef.close();
  }

  editProfilePic(){
    const dialogRef = this.dialog.open(ProfilePicComponent, {
      disableClose : true,
      autoFocus : true,
      width : '700px',
      panelClass: 'image-cropper-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(" before ",this.imageSource);
      
      console.log('data after dialog is closed in edit profile comp: ', result.image.base64);
      this.imageSource = result.image.name
      console.log("after ",this.imageSource);
      
    });
  }


}
