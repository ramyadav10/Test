import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from '../service/utility.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastType } from '../model/ToastType.enum';
const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private utility: UtilityService) { }

  isAuthorised() {
    
    if (String(localStorage.getItem('token')) == '' || String(localStorage.getItem('token')) == 'null'){
      this.router.navigateByUrl('/');
      return false;
    }
      
    const isExpired = helper.isTokenExpired(String(localStorage.getItem('token')));

    if (isExpired) {
      this.utility.showToast(ToastType['INFO'],'Session Expired. Login Again.');
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }
}
