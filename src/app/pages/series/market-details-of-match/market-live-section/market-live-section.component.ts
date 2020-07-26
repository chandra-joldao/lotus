import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-market-live-section',
  templateUrl: './market-live-section.component.html',
  styleUrls: ['./market-live-section.component.scss']
})
export class MarketLiveSectionComponent implements OnInit {
  @Input() matchesDetails: any;
  @Input() matchOdds: any;
  @Input('fancyMatch') fancyMatch: any;
  createBetFormActive: any;
  selectedItem: any;
  constructor() { }

  ngOnInit(): void {
    console.log("matchOdds==", this.matchOdds, "matchesDetails==", this.matchesDetails);
  }

  canceBet() {
    console.log("canceBet");
    this.createBetFormActive = 0;
    // this.viewMode = '';
  }

  openCreateBetForm(viewMode, value, type, item) {
    let currentTime = Date.now();
    this.selectedItem = { type: type, ...item, value: value };
    item['viewMode'] = viewMode;
    item['createBetFormActive'] = currentTime;
    this.createBetFormActive = currentTime;
  }

}
