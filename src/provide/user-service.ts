import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from "./base-service";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  constructor(public http: HttpClient , public baseService: BaseService) {
  }

  login(username, password) {
    let body = { email: username, password: password };
    return this.http.post(this.baseService.loginUrl, body, httpOptions);

  }


}
