
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { BaseService } from "./base-service";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

const headers = new Headers({ 'Content-Type': 'application/json' });
const options = new RequestOptions({ headers: headers });

@Injectable()
export class DataService {

  token: string;

  constructor(public http: Http, public baseService: BaseService) {
    let oAuthRawInfo = sessionStorage.getItem('OAuthInfo');
    let oAuthInfo = JSON.parse(oAuthRawInfo);
    oAuthInfo ? this.token = oAuthInfo.token : '';

  }

  getData(url) {
    return this.http.get(url + "?token=" + this.token, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  postData(url, body) {
    return this.http.post(url + "?token=" + this.token, body, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  patchData(url, id, body) {
    return this.http.patch(url + "/" + id + "?token=" + this.token, body, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  deleteData(url, id) {
    return this.http.delete(url + "/" + id + "?token=" + this.token, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }
}
