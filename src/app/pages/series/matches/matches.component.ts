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
  _routeListener: Subscription;
  eventId;
  competitionId;
  menuHeader: any;
  constructor(
    private _loadingService: LoadingService,
    private _snakebarService: SnakebarService,
    private ds: DataService,
    private apiService: APIService,
    private router: Router,
    private route: ActivatedRoute) {
    this._routeListener = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.route.snapshot.params['id']) {
          let url = event.urlAfterRedirects.split('/');
          this.eventId = url[2];
          this.getMatches(this.route.snapshot.paramMap.get('id'));
        }
      }
    });
  }

  ngOnInit(): void {
    this.ds.breadCrumb$.subscribe(menuHeader => {
      this.menuHeader = menuHeader;
    });
  }

  setEventName(data) {
    this.ds.changeEventDetails(data);
  }

  getMatches(id) {
    this._loadingService.show();
    this.competitionId = id;
    this.apiService.ApiCall('', environment.apiUrl + 'fetch-match-series?eventID=' + id + '&competitionId=' + id, 'get').subscribe(
      result => {
        this._loadingService.hide();
        if (result.success) {
          this.matches = result.data;
        }
        else {
        }
      },
      err => {
      }
    );
  }

  ngOnDestroy() {
    this._routeListener.unsubscribe();
  }

}
