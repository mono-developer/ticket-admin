import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BaseService {

  public baseUrl = "https://ticket2018.herokuapp.com/api";
  public loginUrl= this.baseUrl + "/login";
  public signupUrl = this.baseUrl + "/signup";
  public contentURL = this.baseUrl + "/content";
  public salesUserURL = this.baseUrl + "/sales";
  public organizorURL = this.baseUrl + "/organization";
  public newsLetterURL = this.baseUrl + "/newsletter";
  public categoryURL = this.baseUrl + "/category";
  public couponURL = this.baseUrl + "/coupon";
  public eventURL = this.baseUrl + "/event";
  public userURL = this.baseUrl + "/user";
  public bgroundURL = this.baseUrl + "/background";
  public bannerURL = this.baseUrl + "/banner";

  constructor(public http: Http) {
  }


}
