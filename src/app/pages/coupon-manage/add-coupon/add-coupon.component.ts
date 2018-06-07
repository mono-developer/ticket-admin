import { Component, OnInit } from '@angular/core';
import { routeAnimation } from "../../../route.animation";
import { Router, ActivatedRoute } from "@angular/router";
import { BaseService } from "../../../../provide/base-service";
import { DataService } from "../../../../provide/data-service";
import * as _ from 'lodash';

@Component({
  selector: 'ms-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.scss'],
  host: {
    '[@routeAnimation]': 'true'
  },
  animations: [routeAnimation]
})
export class AddCouponComponent implements OnInit {

  page_title: string = "Add Coupon";
  id:string;
  url: string;
  token: string;
  couponData: any;
  stateList: any;
  isLoading: any;

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public baseService: BaseService,
    public dataService: DataService
  ) {
    this.couponData = { pro_code: '', description: '', discount: '', valid_date: '', state: '' };
    this.stateList = [
      { id: 0, name: 'Active', value: true },
      { id: 1, name: 'Inactive', value: false }
    ];
   }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('item');
    this.url = this.baseService.couponURL;
    this.token = sessionStorage.getItem('token');
    if (this.id) {
      this.getCouponData(this.id);
    } else {
      this.couponData = { pro_code: '', description: '', discount: '', valid_date: '', state: '' };
    }
  }

  getCouponData(id) {
    this.isLoading = true;
    this.dataService.getData(this.url + "/" + id, this.token)
      .subscribe(
        (data) => {
          this.isLoading = false;
          this.couponData = data;
          return true;
        },
        err => {
          this.isLoading = false;
          return true;
        });
  }

  submit() {
    this.id ? this.putCouponData() : this.postCouponData();
  }

  postCouponData() {
    this.isLoading = true;
    this.dataService.postData(this.url, this.token, this.couponData)
      .subscribe(
        (data) => {
          this.router.navigate(['dashboard/coupon-manage/view-coupon']);
          return true;
        },
        error => {
          this.isLoading = false;
          return true;
        })
  }

  putCouponData() {
    this.isLoading = true;
    this.dataService.patchData(this.url, this.id, this.token, this.couponData)
      .subscribe(
        (data) => {
          this.isLoading = false;
          this.router.navigate(['dashboard/coupon-manage/view-coupon']);
          return true;
        },
        error => {
          this.isLoading = false;
          return true;
        })
  }
}
