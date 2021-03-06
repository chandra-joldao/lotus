import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { SnakebarService, LoadingService, APIService, DataService } from '@shared/services';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {
  matches: any = [];
  eventId;
  competitionId;
  menuHeader: any;
  newData: any = {};
  constructor(
    private _loadingService: LoadingService,
    private _snakebarService: SnakebarService,
    private ds: DataService,
    private apiService: APIService,
    private router: Router,
    private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.eventId = params['id'];
      this.competitionId = params['competitionId'];
      this.getMatches();
    })
  }

  ngOnInit(): void {
    this.ds.breadCrumb$.subscribe(menuHeader => {
      this.menuHeader = menuHeader;
    });
  }

  setEventName(data) {
    this.ds.changeEventDetails(data);
  }

  getMatches() {
    this._loadingService.show();
    this.apiService.ApiCall('', environment.apiUrl + 'fetch-match-series?eventID=' + this.eventId + '&competitionId=' + this.competitionId, 'get').subscribe(
      result => {
        this._loadingService.hide();
        if (result.success) {
          this.matches = result.data;
          this.groupData();
        }
        else {
        }
      },
      err => {
      }
    );
  }

  groupData() {
    let newData = {};
    this.matches.forEach(item => {
      const a = new Date(item.event.openDate);
      const b = new Date();

      const _MS_PER_DAY = 1000 * 60 * 60 * 24;
      const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
      const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

      let diff = Math.floor((utc2 - utc1) / _MS_PER_DAY);
      item.diff = diff;
      //console.log(diff)
      if(diff==0)item.marketStartDate = "Today "+a.getHours()+":"+a.getMinutes();
      else if(diff==-1)item.marketStartDate = "Tomorrow "+a.getHours()+":"+a.getMinutes();
      else item.marketStartDate = item.event.openDate;
      let day = a.getDate();
      let month = a.getMonth() + 1;
      let year = a.getFullYear();
      let key = day + '_' + month;
      let newDate = new Date(month + '/' + day + '/' + year);
      if (!newData[key]) newData[key] = { data: [], date: newDate };
      newData[key]['data'].push(item);
    });
    this.newData = newData;
  }

  objectKeys(obj) {
    return Object.keys(obj);
  }

  ngOnDestroy() {
  }

}
