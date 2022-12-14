import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpService } from './http-services.service';
@Injectable({
  providedIn: 'root'
})

export class BatchService {

  constructor(private http: HttpService) { }


  adminBaseURL = environment.ejetLMSServiceURL;


  getTechStack(token: any): Observable<any> {
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    };
    return this.http['getdata'](this.adminBaseURL + 'techstack/active', true, this.httpAuthOptions);
  }
  httpAuthOptions(arg0: string, arg1: boolean, httpAuthOptions: any): Observable<any> {
    throw new Error('Method not implemented.');
  }

  createBatch(data: any, token: any): Observable<any> {
   
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    };
    return this.http['postService'](data, this.adminBaseURL + 'batch/addbatch', true, httpAuthOptions);
  }

  updateBatch(data: any, token: any, batchId: any): Observable<any> {

    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    };
    return this.http['putService'](data, this.adminBaseURL + `batch/${batchId}`, true, httpAuthOptions);
  }
  getAllBatches(token: string | any, status: any, pageNumber: number, offset: number): Observable<any> {

    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    };
    return this.http['getService'](this.adminBaseURL + `batch/${status}/${pageNumber}/${offset}`, true, httpAuthOptions);
  }
  getBatchList(token: string | any,programType: any,): Observable<any> {

    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    };
    return this.http['getService'](this.adminBaseURL + `batch/list/${programType}`, true, httpAuthOptions);
  }

  getBatchDetails(token: string | any, id: any): Observable<any> {
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    };
    return this.http['getService'](this.adminBaseURL + `batch/${id}`, true, httpAuthOptions);
  }

  getRemapHistory(token: string | any,candyId: any,batchId: any){
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    };
    // return this.http.getService(this.batchBaseURL + 'batch/remapinfo/2', true, httpAuthOptions);
    return this.http['getService'](this.adminBaseURL + `batch/remapinfo/${candyId}/${batchId}`, true, httpAuthOptions);


  }
  getCnadidateStatusHistory(token: string | any, candyId: any,batchId: any){
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    };
    // return this.http.getService(this.batchBaseURL + 'batch/remapinfo/2', true, httpAuthOptions);
    return this.http['getService'](this.adminBaseURL + `batch/candiate/status/${candyId}/${batchId}`, true, httpAuthOptions);


  }
  getBatchCandidates(token: string | any, id: any): Observable<any> {
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    };
    return this.http['getService'](this.adminBaseURL + `batch/candidates/${id}`, true, httpAuthOptions);
  }
  getBatchStatusParams(token: string | any, id: string): Observable<any> {
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    };
    return this.http['getService'](this.adminBaseURL + `parameters?keyType=${id}`, true, httpAuthOptions);
  }


  RemapCandidateStatusService(token: string | any,data: { currentBatchId: any; shiftingBatchId: any; candidateId: any; candidateStatus: any; },params: { programType: boolean; remapDate: any; remapReason: any; candidateStatus: any; }){


    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    };
    // return this.http.putService(candidatesList,this.batchBaseURL + `batch/assign/${batchId}`,true,httpAuthOptions);
    // return this.http.putService(data, this.batchBaseURL + `batch/status/${data.batchId}/${data.status}`, true, httpAuthOptions)
    return this.http['putService'](params, this.adminBaseURL + `batch/move/${data.currentBatchId}/${data.shiftingBatchId}/${data.candidateId}?candidateStatus=${data.candidateStatus}`, true, httpAuthOptions)

  }
  ChangeBatchStatus(token: string | any,data: { batchId: any; parameterId: any; },ids: { // return this.http.putService(data, this.batchBaseURL + `batch/status/${data.batchId}/${data.status}`, true, httpAuthOptions)
      batchStatus: any; changeStatusDate: any; changeStatusReason: any;
    }){
    // batch/status/000/COMPLETED


    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    };
    // return this.http.putService(candidatesList,this.batchBaseURL + `batch/assign/${batchId}`,true,httpAuthOptions);
    return this.http['putService'](ids, this.adminBaseURL + `batch/status/${data.batchId}/${data.parameterId}`, true, httpAuthOptions)


  }
  getDetails(token: string | any): Observable<any> {
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    };
    return this.http['getdata'](this.adminBaseURL + `/mentor/map`, true, httpAuthOptions);
  }

  getCoordinatorDetails(token: string | any): Observable<any> {
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    };
    return this.http['getdata'](this.adminBaseURL + `coordinator`, true, httpAuthOptions);
  }

  unAssignCandidate(token: string | any, batchId: any, candidateId: any): Observable<any> {
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    };
    return this.http['putService']("", this.adminBaseURL + `batch/unassign/${batchId}/${candidateId}`, true, httpAuthOptions);
  }

  getUnassignedCandidates(token: string | any, pageNumber: number, offset: number): Observable<any> {
    let New='NEW'
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    };
    return this.http['getService'](this.adminBaseURL + `/learner/candidates/${pageNumber}/${offset}`, true, httpAuthOptions);
  }

  getAllCandidates(token: string | any, status: string, pageNumber: number, offset: number): Observable<any> {
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    };
    return this.http['getService'](this.adminBaseURL + `/hiring/candidates/${status}/${pageNumber}/${offset}`, true, httpAuthOptions);
  }

  getCandidatesStatusCount(token: string | any): Observable<any> {
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    };
    return this.http['getService'](this.adminBaseURL + `/hiring/candidates/count`, true, httpAuthOptions);
  }


  assignedCandidates(token: string | any, batchId: any, candidatesList: any[]): Observable<any> {
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    };
    return this.http['putService'](candidatesList, this.adminBaseURL + `batch/assign/${batchId}`, true, httpAuthOptions);
  }

  remapCandidateTonewBatch(data: any, token: any, currentBatchId: any, shiftingBatchId: any, candidateId: any) {
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    };
    // return this.http.putService(candidatesList,this.batchBaseURL + `batch/assign/${batchId}`,true,httpAuthOptions);
    return this.http['putService'](data, this.adminBaseURL + `batch/move/${currentBatchId}/${shiftingBatchId}/${candidateId}`, true, httpAuthOptions)

  }
  getBatchesCount(token: string | any): Observable<any> {
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    };
    return this.http['getService'](this.adminBaseURL + `batch/count`, true, httpAuthOptions);
  }

  getUnassignCount(token: any): Observable<any> {
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    };
    return this.http['getService'](this.adminBaseURL + `hiring/count`, true, httpAuthOptions);
  }

  getAssignedCandidates(token: string | any, id: any): Observable<any> {
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    };
    return this.http['getService'](this.adminBaseURL + `batch/candidates/${id}`, true, httpAuthOptions);
  }

  searchBatch(token: string | any,searchBy: string,tab: any, searchWord: string): Observable<any> {
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    };
    return this.http['getService'](this.adminBaseURL + `batch/search/${searchBy}/${tab}?word=${searchWord}`, true, httpAuthOptions);
  }

  searchCandidate(token: string | any, searchBy: string, searchTab: string, searchWord: any): Observable<any> {
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    };
    return this.http['getService'](this.adminBaseURL + `learner/search/${searchBy}/${searchTab}?word=${searchWord}`, true, httpAuthOptions);
  }

  searchAssignedCandidate(token: string | any, searchBy: string, searchTab: string, searchWord: any): Observable<any> {
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    };
    return this.http['getService'](this.adminBaseURL + `learner/searchforassignedcandidate/${searchBy}/${searchTab}?word=${searchWord}`, true, httpAuthOptions);
  }

  deleteBatch(token: string | any, batchId: any): Observable<any> {
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    };
    return this.http['deleteService'](this.adminBaseURL + `batch/${batchId}`, true, httpAuthOptions);
  }

  removeCandidate(token: string | any, candidateId: any): Observable<any> {
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    };
    return this.http['deleteService'](this.adminBaseURL + `hiring/candidate/${candidateId}`, true, httpAuthOptions);
  }

  getLearnerDetails(): Observable<any> {
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    console.log('getting values');
    // let data = this.http['getService'](this.learnerBaseURL + `batch/getAllLearnerDeatils`, true, httpAuthOptions);
    // console.log('this is log data',data);

    return this.http['getdata'](this.adminBaseURL + `batch/getAllLearnerDetails`, true, httpAuthOptions);

  }

  getAllLearnerBatchDetailsByBatchNameAndStatus(token:any,batchName:any,status:any): Observable<any> {
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    };
    return this.http['getService'](this.adminBaseURL + `batch/getAllLearnerBatchDetailsByBatchNameAndStatus/`+batchName+"/"+status, true, httpAuthOptions);
  }

  getmentorDetails(): Observable<any> {
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    console.log('getting values');
    // let data = this.http['getService'](this.learnerBaseURL + `batch/getAllLearnerDeatils`, true, httpAuthOptions);
    // console.log('this is log data',data);

    return this.http['getdata'](this.adminBaseURL + `mentor`, true, httpAuthOptions);

  }
}
