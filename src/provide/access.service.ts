import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import * as _ from 'lodash';
import 'rxjs/add/observable/throw';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
declare let require: (any);
declare let process: (any);

export const CURRENT_PROFILE_ID = 1;

@Injectable()
export class AccessService implements CanActivate {

  private canAccess: boolean = false;

  constructor(
    private http: Http,
    private router: Router
  ) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // Get token and set for all requests.
    this.canAccess = this.getCanAccess();
    console.log("this.canaccess", this.canAccess);
    if (!this.canAccess) {
      this.router.navigate(['login']);
    }
    return this.canAccess;
  }


  getCanAccess(): boolean {
    let oAuthRawInfo = sessionStorage.getItem('OAuthInfo');
    console.log('oAuthRawInfo', oAuthRawInfo);
    let oAuthInfo = JSON.parse(oAuthRawInfo);
    console.log('oAuthInfo', oAuthInfo);
    return oAuthRawInfo !== undefined && oAuthInfo !== null;
  }
}
