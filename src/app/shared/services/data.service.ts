import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  private breadCrumb = new BehaviorSubject<any>(null);
  breadCrumb$ = this.breadCrumb.asObservable();
  changeBread(data) {
    this.breadCrumb.next(data);
    localStorage.setItem('breadCrumb', JSON.stringify(data));
  }

  private event = new BehaviorSubject<any>(null);
  event$ = this.event.asObservable();
  changeEvent(data) {
    this.event.next(data);
    localStorage.setItem('event', JSON.stringify(data));
  }

  constructor(private router: Router) {
    this.event.next(JSON.parse(localStorage.getItem('event')));
    this.breadCrumb.next(JSON.parse(localStorage.getItem('breadCrumb')));
  }


}
