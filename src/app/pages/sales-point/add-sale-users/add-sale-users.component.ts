import { Component, OnInit } from '@angular/core';
import { routeAnimation } from "../../../route.animation";
import { Router, ActivatedRoute } from "@angular/router";
import { BaseService } from "../../../../provide/base-service";
import { DataService } from "../../../../provide/data-service";
import { UserService } from "../../../../provide/user-service";
import * as _ from 'lodash';

@Component({
  selector: 'ms-add-sale-users',
  templateUrl: './add-sale-users.component.html',
  styleUrls: ['./add-sale-users.component.scss'],
  host: {
    '[@routeAnimation]': 'true'
  },
  animations: [ routeAnimation ]
})
export class AddSaleUsersComponent implements OnInit {
  page_title: string = 'Add user of the sales team'
  id: string;
  url: string;
  token: string;
  userData: any = {};
  stateList: any;
  isLoading: boolean = false;
  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public baseService: BaseService,
    public dataService: DataService,
    public userService: UserService
  ) {
    this.stateList = [  { id: 0, name: 'Active', state: true },
                        { id: 1, name: 'Inative', state: false }
                    ];
    this.userData.status = false;
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('item');
    this.url = this.baseService.userURL;
    this.token = sessionStorage.getItem('token');
    console.log(this.token);
    console.log('item', this.id);
    if (this.id) {
      this.getSalesUserData(this.id);
    }
  }

  getSalesUserData(id) {
    this.isLoading = true;
    this.dataService.getData(this.url + "/" + id, this.token)
      .subscribe(
        (data) => {
          this.isLoading = false;
          this.userData = data;
          console.log(this.userData);
          return true;
        },
        err => {
          this.isLoading = false;
          console.log('errorData', err);
          return true;
        });
  }

  submit() {
    console.log(this.userData);
    this.id ? this.putUserData() : this.postUserData();
  }

  postUserData() {
    this.isLoading = true;
    this.userData.access = '2';
    this.userService.signup(this.userData)
      .subscribe(
        (data) => {
          console.log('salesUserData', data);
          this.router.navigate(['dashboard/sales-point/view-sale-users']);
          return true;
        },
        error => {
          this.isLoading = false;
          console.log('errorData', error);
          return true;
        });
  }

  putUserData() {
    this.isLoading = true;
    this.userService.updateProfile(this.url, this.id, this.userData, this.token)
      .subscribe(
        (data) => {
          console.log('userData', data);
          this.isLoading = false;
          this.router.navigate(['dashboard/sales-point/view-sale-users']);
          return true;
        },
        error => {
          this.isLoading = false;
          console.log('errorData', error);
          return true;
        });
  }

  getEscaped(text: string) {
    return _.escape(text);
  }

}
