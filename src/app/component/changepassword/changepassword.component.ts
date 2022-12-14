import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ResetPasswordDTO } from 'src/app/model/ResetPasswordDTO.model';
import { ToastType } from 'src/app/model/ToastType.enum';
import { AdminService } from 'src/app/service/admin.service';
import { UtilityService } from 'src/app/service/utility.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {

  hidePassword: boolean = false;
  hideNewPassword: boolean = false;
  hideReTypepassword: boolean = false;
  disableSubmit: boolean = false;
  currentPassword = new FormControl('', [Validators.required]);
  newPassword = new FormControl('', [Validators.required]);
  reTypePassword = new FormControl('', [Validators.required]);
  constructor(private dialogRef: MatDialogRef<ChangepasswordComponent>, private utility: UtilityService,
    private adminService: AdminService) { }

  ngOnInit() {
  }
  submit() {
    let resetPasswordDTO = new ResetPasswordDTO();
    if (this.newPassword.value == this.reTypePassword.value) {
      resetPasswordDTO.currentPassword = this.currentPassword.value;
      resetPasswordDTO.newPassword = this.newPassword.value;
      console.log(resetPasswordDTO);
      this.dialogRef.close();

      this.adminService.resetPassword(resetPasswordDTO)
        .subscribe(response => {
          console.log(response);
          
          this.utility.showToast(ToastType['SUCCESS'], (response as any).message);
        }, (error) => {
          this.utility.errorHandler(error);
        });
    } else {
      this.utility.showToast(ToastType['WARNING'], 'New Password Does Not Match.');
    }
  }

  close() {
    this.dialogRef.close();
  }

}
