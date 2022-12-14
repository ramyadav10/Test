import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  [x: string]: any;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}
  /*
  constructor(private http: HttpClient) { }
  postService(payload: any = null, url: string = '', tokenRequired: boolean = false, httpOptions: string = '') {
    /* handles post operations
      params : id  : id of question or comment to add/post,
      apiendpoint : endpoint i.e 'comments/' , 'answers/', 'editquestions/'
  *s
    return this.http.post(url, payload)
    
    //(url, payload, tokenRequired && httpOptions);
  }

  putService(payload: any = null, url: string = '', tokenRequired: boolean = false, httpOptions = null) {
    /* handles post operations
      params : id  : id of question or comment to add/post,
      apiendpoint : endpoint i.e 'comments/' , 'answers/', 'editquestions/'
  *
    return this.http.put(url, payload, tokenRequired);
  }

  patchService(url: string, payload: any = null, tokenRequired: boolean = false) {
    /* handles edit/patch operations
  params : id  : id of question or comment to edit,
          apiendpoint : endpoint i.e 'comments' , 'answers'
  id attached as url param.
  *
    return this.http.patch(url, payload, tokenRequired && this.httpOptions);
  }

  deleteService(url: string = '', tokenRequired: boolean = false, httpOptions = null) {
    /* handles delete operations
  params : id  : id of question or comment to delete,
          apiendpoint : endpoint i.e 'comments' , 'answers'
  id attached as url param.
  *
    return this.http.delete(url, tokenRequired && this.httpOptions);
  }
  getService(url: string = '', tokenRequired: boolean = false, httpOptions = null) {
    
    return this.http.get(url, tokenRequired && this.httpOptions);
  }
  optionsService(url: any = '') {
    /* handles api calls for options request *
    return this.http.options(url);
  }
*/

  /**
   * This function takes a url, a boolean, and an object as parameters and returns an observable.
   * @param {string} url - The URL to be called
   * @param {boolean} [tokenRequired=false] - boolean = false
   * @param {any} httpOptions -
   * @returns The return type is an Observable.
   */
  getdata(url: string, tokenRequired: boolean = false, httpOptions: any) {
    return this.http.get(url, httpOptions);
  }
  /**
   * If tokenRequired is true, then return this.http.get(url, httpOptions); otherwise, return
   * this.http.get(url).
   * @param {string} url - The url of the service you want to call.
   * @param {boolean} [tokenRequired=false] - boolean = false
   * @param {any} httpOptions - This is the object that contains the headers and other options that you
   * want to pass to the http request.
   * @returns The return type is an Observable.
   */
  getService(url: string, tokenRequired: boolean = false, httpOptions: any) {
    return this.http.get(url, tokenRequired && httpOptions);
  }

  postService(payload: any = null, url: string, tokenRequired: boolean = false, httpOptions: any) {
    // /handles post operations
      // params : id  : id of question or comment to add/post,
      // apiendpoint : endpoint i.e 'comments/' , 'answers/', 'editquestions/'
  

    return this.http.post(url, payload,tokenRequired && httpOptions);
    
    //(url, payload, tokenRequired && httpOptions);
  }

  /**
   * "If tokenRequired is true, then return the http.delete() function with the tokenRequired and
   * httpOptions parameters, otherwise return the http.delete() function with only the url parameter."
   * </code>
   * @param {string} url - The url of the service you want to call.
   * @param {boolean} [tokenRequired=false] - boolean = false
   * @param {any} httpOptions - This is the object that contains the headers and other options that you
   * want to pass to the request.
   * @returns The return type is an Observable.
   */
  deleteService(url: string, tokenRequired: boolean = false, httpOptions: any) {
    return this.http.delete(url, tokenRequired && httpOptions);

  }


  /**
   * It takes in a payload, a url, a tokenRequired boolean, and httpOptions. 
   * 
   * If tokenRequired is true, it will return an http.put request with the payload, url, and
   * httpOptions. 
   * 
   * If tokenRequired is false, it will return an http.put request with the payload and url.
   * @param {any} [payload=null] - any = null,
   * @param {string} url - The url of the API endpoint
   * @param {boolean} [tokenRequired=false] - boolean = false -&gt; This is a flag to check if the
   * request requires a token or not.
   * @param {any} httpOptions - This is the object that contains the headers and other options that you
   * want to pass to the request.
   * @returns The return type is an Observable.
   */
  putService(payload: any = null, url: string, tokenRequired: boolean = false, httpOptions: any) {
      return this.http.put(url, payload,tokenRequired && httpOptions);
  }
}
