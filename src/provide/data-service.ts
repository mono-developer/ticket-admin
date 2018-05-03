
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { BaseService } from "./base-service";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

const headers = new Headers({ 'Content-Type': 'application/json' });
const options = new RequestOptions({ headers: headers });

@Injectable()
export class DataService {

  constructor(public http: Http, public baseService: BaseService) {}

  getNoTokenData(url) {
    return this.http.get(url, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  getData(url, token) {
    return this.http.get(url + "?token=" + token, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  postData(url, token, body) {
    return this.http.post(url + "?token=" + token, body, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  patchData(url, id, token, body) {
    console.log(url + "/" + id + "?token=" + token);
    return this.http.patch(url + "/" + id + "?token=" + token, body, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  deleteData(url, id, token) {
    return this.http.delete(url + "/" + id + "?token=" + token, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  postNoTokenData(url, body) {
    return this.http.post(url, body, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  deleteNoTokenData(url, id) {
    return this.http.delete(url + "/" + id, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

}
