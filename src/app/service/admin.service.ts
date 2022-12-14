import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginDetailsDTO } from '../model/LoginDetailsDTO.model';
import { ResetPasswordDTO } from '../model/ResetPasswordDTO.model';
import { UserDetailsDTO } from '../model/UserDetailsDTO.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  baseUrl: string = environment.ejetLMSServiceURL;

  constructor(private http: HttpClient) { }

  authorize(loginDetails: LoginDetailsDTO) {
    return this.http.post(this.baseUrl + "admin/authorize", loginDetails);
  }

  resetPassword(resetPassordObject: ResetPasswordDTO) {
    return this.http.post(this.baseUrl + "/admin/reset/password", resetPassordObject, {
      headers: new HttpHeaders().set('token', String(localStorage.getItem('token')))
    });
  }

  updateUserDetails(userDetailsDTO: UserDetailsDTO) {
    return this.http.put(this.baseUrl + "/admin", userDetailsDTO, {
      headers: new HttpHeaders().set('token', String(localStorage.getItem('token')))
    })
  }

  uploadProfile(file: string | Blob) {
    const fd: FormData = new FormData();
    fd.append("file", file);
    return this.http.post(this.baseUrl + "/admin/profile", fd);
  }

  getUserDetails() {
    return this.http.get(this.baseUrl + "/admin", {
      headers: new HttpHeaders().set('token', String(localStorage.getItem('token')))
    });
  }

  getAllUserDetails(){
    return this.http.get(this.baseUrl + "/admin/users", {
      headers: new HttpHeaders().set('token', String(localStorage.getItem('token')))
    });
  }

  addTechType(techTypeName: string | number | boolean) {
    return this.http.post(this.baseUrl + "/techtype", null, {
      headers: new HttpHeaders().set('token', String(localStorage.getItem('token'))),
      params: new HttpParams().append('techTypeName',techTypeName)
    });
  }

  getAllTechTypes(){
    return this.http.get(this.baseUrl + "/techtype");
  }

}
