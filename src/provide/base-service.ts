import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BaseService {

  // public baseUrl = "http://beta.myidband.com/api/v5/";
  public baseUrl = "https://ticket2018.herokuapp.com/api";
  public loginUrl= this.baseUrl + "/login";
  public signupUrl = this.baseUrl + "/signup";
  public contentURL = this.baseUrl + "/content";
  public salesUserURL = this.baseUrl + "/salesteam"

  constructor(public http: Http) {
    console.log('Hello BaseService Provider');
  }


}
