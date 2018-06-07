import { Component, OnInit } from '@angular/core';
import { routeAnimation } from "../../../route.animation";
import { Router, ActivatedRoute } from "@angular/router";
import { BaseService } from "../../../../provide/base-service";
import { DataService } from "../../../../provide/data-service";
import { UserService } from "../../../../provide/user-service";

@Component({
  selector: 'ms-add-organizor',
  templateUrl: './add-organizor.component.html',
  styleUrls: ['./add-organizor.component.scss'],
  host: {
    '[@routeAnimation]': 'true'
  },
  animations: [routeAnimation]
})
export class AddOrganizorComponent implements OnInit {

  page_title : string = "Add Organizor";
  id: string;
  url: string;
  token: string;
  stateList: any;
  userData: any = {};
  isLoading: boolean = false;

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public baseService: BaseService,
    public dataService: DataService,
    public userService: UserService
  ) {
      this.stateList = [
        { id: 0, name: 'Active', status: true },
        { id: 1, name: 'Intivate', status: false }
        ];
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('item');
    this.url = this.baseService.userURL;
    this.token = sessionStorage.getItem('token');
    if (this.id) {
      this.getOrgData(this.id);
    } else {
      this.userData.status = false;
    }
  }

  getOrgData(id) {
    this.isLoading = true;
    this.dataService.getData(this.url + "/" + id, this.token)
      .subscribe(
        (data) => {
          this.isLoading = false;
          this.userData = data;
          return true;
        },
        err => {
          this.isLoading = false;
          return true;
        });
  }

  submit() {
    this.id ? this.putOrgData() : this.postOrgData();
  }

  putOrgData() {
    this.isLoading = true;
    this.userService.updateProfile(this.url, this.id, this.userData, this.token)
      .subscribe(
        (data) => {
          this.isLoading = false;
          this.router.navigate(['dashboard/organizor-manage/view-organizor']);
          return true;
        },
        error => {
          this.isLoading = false;
          return true;
        });
  }

  postOrgData() {

    this.isLoading = true;
    this.userData.access = '1';
    this.userService.signup(this.userData)
      .subscribe(
        (data) => {
          this.isLoading = false;
          this.router.navigate(['dashboard/organizor-manage/view-organizor']);
          return true;
        },
        error => {
          this.isLoading = false;
          return true;
        });
  }

}
