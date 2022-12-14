import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  

  private messageSource = new BehaviorSubject(Boolean);
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  set changeMessage(message: any) {
    this.messageSource.next(message)
  }
  
  public get searchMessage() : any {
    return this.messageSource;
  }
  
}
