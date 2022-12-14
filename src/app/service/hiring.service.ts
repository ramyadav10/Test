import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HiringService {

  private baseURL:string = environment.ejetLMSServiceURL;

  constructor(private http:HttpClient) { }

  addCandidates(candidates: any){
    return this.http.post(this.baseURL + `/hiring/candidates`,candidates,{
      headers: new HttpHeaders().append('token',String(localStorage.getItem('token')))
    });
  }
  
  getCandidatesByStatus(status: string,pageNumber: number,offset: number){
    return this.http.get(this.baseURL + `/hiring/candidates/${status}/${pageNumber}/${offset}`,{
      headers: new HttpHeaders().set('token',String(localStorage.getItem('token')))
    });
  }


  getCandidateCountByProgram(){
    
    return this.http.get(this.baseURL + `hiring/program/praticehead/count`,{
      headers: new HttpHeaders().set('token',String(localStorage.getItem('token')))
    });
  }
  getCandidateDetailById(candidateId: string){
    return this.http.get(this.baseURL + `/hiring/candidate/${candidateId}`,{
      headers: new HttpHeaders().set('token',String(localStorage.getItem('token')))
    });
  }

  updateCandidateStatus(candidateId: any,status: string){
    return this.http.put(this.baseURL + `/learner/candidate/${candidateId}/${status}`,null,{
      headers: new HttpHeaders().append('token',String(localStorage.getItem('token')))
    });
  }

  changeStatusService(data: { parameterId: any; candidateId: any; },candidateData: { changeStatusDate: any; changeStatusReason: any; candidateStatus: any; exitReason: any; } | { changeStatusDate: any; changeStatusReason: any; candidateStatus: any; exitReason?: undefined; }){
    // hiring/candidate/status/666/555

    return this.http.put(this.baseURL + `learner/candidate/status/${data.parameterId}/${data.candidateId}`,candidateData,{
      headers: new HttpHeaders().append('token',String(localStorage.getItem('token')))
    });
  }
  updateCandidate(candidateData: { id: any; cicId: any; fullName: any; mobileNum: any; email: any; degree: any; aggrPer: any; passedOutYear: any; city: any; state: any; preferredJobLocation: any; candidateStatus: any; }){
    return this.http.put(this.baseURL + `/learner/candidate`,candidateData,{
      headers: new HttpHeaders().append('token',String(localStorage.getItem('token')))
    });
  }

  getCandidateCounts(){
    return this.http.get(this.baseURL + `/hiring/candidate/counts`,{
      headers: new HttpHeaders().set('token',String(localStorage.getItem('token')))
    });
  }

  resendMail(candidateId: any){
    return this.http.get(this.baseURL + `/hiring/resend/${candidateId}`,{
      headers: new HttpHeaders().set('token',String(localStorage.getItem('token')))
    });
  }

  removeCandidate(candidateId: any){
    return this.http.delete(this.baseURL + `/hiring/candidate/${candidateId}` ,{
      headers: new HttpHeaders().append('token',String(localStorage.getItem('token')))
    });
  }
}
