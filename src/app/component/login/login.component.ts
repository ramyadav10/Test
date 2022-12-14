import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDetailsDTO } from 'src/app/model/LoginDetailsDTO.model';
import { ToastType } from 'src/app/model/ToastType.enum';
import { AdminService } from 'src/app/service/admin.service';
import { UtilityService } from 'src/app/service/utility.service';

const loginDetails = {
  emailId: '',
  password: '',
};
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide: boolean = false;
  disableSubmit: boolean = false;
  loginForm: FormGroup;
  applyColour!: String;
  // email = new FormControl(loginDetails.emailId, [Validators.required, Validators.email]);
  // password = new FormControl(loginDetails.password, [Validators.required, Validators.minLength(5)]);

  constructor(
    private router: Router,
    private adminService: AdminService,
    private utilityService: UtilityService,
    public fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(
            '^([a-zA-Z0-9][.-]?)+@([a-zA-Z0-9]+[.-]?)*[a-zA-Z0-9][.][a-zA-Z]{2,3}$'
          ),
        ]),
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(5)]),
      ],
    });
  }

  ngOnInit() {

  if (this.router.url === '/home/learners') {
      // this.showsearchbarinlearnercomponents=true;
      this.applyColour = 'Learners';
      }
  
  }

  getErrorMessage(control: FormControl, alias: string) {
    if (control.errors) {
      if (control.errors['required']) {
        return alias + ' is required';
      }

      if (control.errors['pattern'] || control.errors['whitespace']) {
        return 'Invalid ' + alias.toLowerCase();
      }
      // if (control.errors['pattern'] || control.errors['whitespace']) {
      //   return 'Invalid ' + alias.toLowerCase();
      // }
      else {
        return null;
      }
    }
    return null;
  }

  login() {
    this.utilityService.openLoader();
    if (this.loginForm.invalid) {
      this.utilityService.closeLoader();
      this.utilityService.markFormGroupTouched(this.loginForm);
    } else{
      this.disableSubmit = true;
      let loginDetailsDTO = new LoginDetailsDTO();
      loginDetailsDTO.emailId = this.loginForm.value.email;
      loginDetailsDTO.password = this.loginForm.value.password;
      console.log("Data from the form -> user ID :" +loginDetailsDTO.emailId +" password: "+loginDetailsDTO.password);

      this.adminService.authorize(loginDetailsDTO).subscribe(
        (response) => {
          localStorage.setItem('token', String((response as any).data));
          this.utilityService.closeLoader();
          this.router.navigateByUrl('/home/learners');
        },
        (error) => {
          this.utilityService.closeLoader();
          this.utilityService.showToast(
            ToastType['ERROR'],
            error.error.message
          );
          this.disableSubmit = false;
        }
      );
    }
  }
  onKeydown(event: any) {
    this.login();
  }
  
  
}
