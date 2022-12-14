import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService } from './http-services.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MentorService {
  baseUrl = environment.ejetLMSServiceURL;
  // baseUrl='https://lms-admin-backend-stg.incubation.bridgelabz.com/'
  constructor(private httpService: HttpService, private http: HttpClient) { }

  public createMentor(data: FormData, token: any): Observable<any> {

    let httpAuthOptions = {
      headers: new HttpHeaders({
        "Accept": "application/json",
        'token': token
      })
    };
    return this.httpService['postService'](data, this.baseUrl + 'mentor', true, httpAuthOptions);
  }
  // 
  addTimeSlot(data: any, token: any) {

    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    };
    return this.httpService['postService'](data, this.baseUrl + 'timeslot', true, httpAuthOptions);
  }

  getMentorDetails(id: string)
  {
    let token: any = localStorage.getItem('token')

    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    };
    return this.httpService['getdata'](this.baseUrl + 'mentor/'+id, true, httpAuthOptions);
  }
  getAllMentors(token: any) {

    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    };
    return this.httpService['getdata'](this.baseUrl + 'mentor', true, httpAuthOptions);

  }
  getTimeSlots(): Observable<any> {
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'token': token
      })
    };
    return this.httpService['getService'](this.baseUrl + 'timeslot', true, httpAuthOptions);
  }
  updateMentor(data: any, token: any, mentorId: any): Observable<any> {
    const formData = new FormData();
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('mentorType', data.mentorType);
    formData.append('mentorRole', data.mentorRole);
    formData.append('mobileNumber', data.mobileNumber);
    formData.append('email', data.email);
    formData.append('experienceYears', data.experienceYears);
    formData.append('preferredTime', data.preferredTime);
    formData.append('mentorDescription', data.mentorDescription);
    formData.append('file', data.file);
    // formData.append('techId', data.techId);
    formData.append('techStacks', data.techStacks);
    formData.append('supervisorId', data.supervisorId);
    formData.append('startDate', data.startDate);
    formData.append('status', data.status);
    formData.append('employeeId', data.employeeId);

    
    
    let httpAuthOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        'token': token
      })
    };
    let endPoint ;
    // let payload={}
    let str='&techStacks'
    for (var i=0;i<data.techStacks.length;i++){
      str=str+'='+data.techStacks[i]
      if(data.techStacks.length-1!=i)
      str=str+'&techStacks'
    }
    const formData1 = new FormData();

    formData1.append('techdata', str);

    endPoint = `mentor/${mentorId}?email=${formData.get('email')}&experienceYears=${formData.get('experienceYears')}&firstName=${formData.get('firstName')}&lastName=${formData.get('lastName')}&mentorDescription=${formData.get('mentorDescription')}&mentorRole=${formData.get('mentorRole')}&mentorType=${formData.get('mentorType')}&mobileNumber=${formData.get('mobileNumber')}&preferredTime=${formData.get('preferredTime')}&startDate=${formData.get('startDate')}&status=${formData.get('status')}&employeeId=${formData.get('employeeId')}&supervisorId=${formData.get('supervisorId')}${formData1.get('techdata')}`
   

    // let endPoint = `mentor/${mentorId}?email=${formData.get('email')}&experienceYears=${formData.get('experienceYears')}&firstName=${formData.get('firstName')}&lastName=${formData.get('lastName')}&mentorDescription=${formData.get('mentorDescription')}&mentorRole=${formData.get('mentorRole')}&mentorType=${formData.get('mentorType')}&mobileNumber=${formData.get('mobileNumber')}&preferredTime=${formData.get('preferredTime')}&techStacks=${formData.get('techStacks')}`
    return this.httpService['putService'](formData, this.baseUrl + endPoint, true, httpAuthOptions);
  }
  getTechType(): Observable<any> {
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'token': token
      })
    };
    return this.httpService['getService'](this.baseUrl + 'techtype', true, httpAuthOptions);

  }
  getTechStack(): Observable<any> {
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'token': token
      })
    };
    return this.httpService['getService'](this.baseUrl + 'techstack/active', true, httpAuthOptions);

  }

  createTechStack(data: any, techName: any) {
    //token solved..
    let token: any = localStorage.getItem('token')
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'token': token
      })
    }
    return this.httpService['postService'](data, this.baseUrl + 'techstack/addtechstack/'+ techName, true, httpAuthOptions);
  }

  delete(id: any, type: any) {
    let token: any = localStorage.getItem('token')
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'token': token
      })
    }

    return this.httpService['deleteService'](this.baseUrl + type + id, true, httpAuthOptions);
  }
  updateTechStack(techId: any, reqData: any): Observable<any> {
    let token: any = localStorage.getItem('token')
    let formData = new FormData();
    formData.append('file', reqData.file);
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    };
    let endPoint = `techstack/${techId}?techName=${reqData.techTypeName}`
    return this.httpService['putService'](formData, this.baseUrl + endPoint, true, httpAuthOptions);
  }
  updateTimeSlot(data: any, id: any, token: any) {

    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    };
    return this.httpService['putService'](data, this.baseUrl + 'timeslot/' + id, true, httpAuthOptions);
  }

  addProgramType(data: any) {
    let token: any = localStorage.getItem('token')
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'token': token
      })
    }
    return this.httpService['postService'](data, this.baseUrl + 'programtype', true, httpAuthOptions);
  }
  updateProgramType(data: any, id: any, token: any) {
    
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    };
    return this.httpService['putService'](data, this.baseUrl + 'programtype/' + id, true, httpAuthOptions);
  }
  getProgramType(): Observable<any> {
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'token': token
      })
    };
    return this.httpService['getService'](this.baseUrl + 'programtype', true, httpAuthOptions);
  }

  deleteProgramType(id: any) {
    let token: any = localStorage.getItem('token')
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'token': token
      })
    }

    return this.httpService['deleteService'](this.baseUrl + "programtype/" + id, true, httpAuthOptions);
  }
}