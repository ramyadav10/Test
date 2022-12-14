import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { HttpService } from './http-services.service';

@Injectable({
  providedIn: 'root'
})
export class CoordinatorService {
  helper: any;

  constructor(private http: HttpService) { }
  baseUrl = environment.ejetLMSServiceURL;

  getCoordinatorNames(token: any) {

    const httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http['getService'](this.baseUrl + '', true, httpAuthOptions);
  
  }

  getCoordinatorDetails(id: string) {
    let token: any = localStorage.getItem('token')
    const httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    };
    // /coordinator/details-by/{coordinatorId}

    return this.http['getService'](this.baseUrl + 'coordinator/' + id, true, httpAuthOptions);
  }
  getCoordinator(token: any): Observable<any> {

    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    };
    return this.http['getService'](this.baseUrl + 'coordinator', true, httpAuthOptions);
  }


  addCoordinator(data: any, token: any): Observable<any> {

    let httpAuthOptions = {
      headers: new HttpHeaders({
        'token': token
      })
    };
    return this.http['postService'](data, this.baseUrl + 'coordinator/create', true, httpAuthOptions);
  }

  updateCoordinator(data: any, id: any, token: any): Observable<any> {

    let httpAuthOptions = {
      headers: new HttpHeaders({
        'token': token
      })
    };
    return this.http['putService'](data, this.baseUrl + `coordinator/update/${id}`, true, httpAuthOptions);
  }

  removeCoordinator(id: any, token: any): Observable<any> {

    let httpAuthOptions = {
      headers: new HttpHeaders({
        'token': token
      })
    };
    return this.http['deleteService'](this.baseUrl + `coordinator/delete/${id}`, true, httpAuthOptions);
  }

  searchCoordinator(token: string | any, searchBy: string, searchWord: any): Observable<any> {
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    };
    return this.http['getService'](this.baseUrl + `coordinator/search/${searchBy}?word=${searchWord}`, true, httpAuthOptions);
  }
}
