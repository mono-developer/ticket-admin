import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { BaseService } from "./base-service";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

const headers = new Headers({ 'Content-Type': 'application/json' });
const options = new RequestOptions({ headers: headers });

@Injectable()
export class UserService {

  constructor(public http: Http , public baseService: BaseService) {
  }

  login(body) {
    return this.http.post(this.baseService.loginUrl, body, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  signup(body) {
    return this.http.post(this.baseService.signupUrl, body, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }


}
