import {
  Component, OnInit, ViewChild, ViewEncapsulation, AfterViewInit, ViewChildren, QueryList,
  ElementRef, OnDestroy
} from '@angular/core';
import {Subscription} from "rxjs";
import {MediaChange} from "@angular/flex-layout";
import {Router, NavigationEnd} from "@angular/router";

import * as screenfull from 'screenfull';

@Component({
  selector: 'ms-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit, OnDestroy {

  private _mediaSubscription: Subscription;
  private _routerEventsSubscription: Subscription;

  quickpanelOpen: boolean = false;
  isMobile: boolean = false;
  buyNowToolbarVisible = true;

  isFullscreen: boolean = false;
  constructor(
    private router: Router,
  ) {

   }

  ngOnInit() {

    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 2000);
  }

  ngOnDestroy() {
    // this.router.navigate(['./login']);
    // this._mediaSubscription.unsubscribe();
  }

  onActivate(e, scrollContainer) {
    scrollContainer.scrollTop = 0;
  }

  toggleFullscreen() {
    if (screenfull.enabled) {
      screenfull.toggle();
      this.isFullscreen = !this.isFullscreen;
    }
  }

}
