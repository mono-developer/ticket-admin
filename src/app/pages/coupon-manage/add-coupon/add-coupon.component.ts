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
    this.stateList = [ { id: 0, name: 'Active', value: true },
                       { id: 1, name: 'Inactive', value: false }
                    ];

   }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('item');
    this.url = this.baseService.couponURL;
    console.log('item', this.id);
    if (this.id) {
      this.getCouponData(this.id);
    } else {
      this.couponData = { pro_code: '', description: '', discount: '', valid_date: '', state: '' };
    }
  }

  getCouponData(id) {
    this.isLoading = true;
    this.dataService.getData(this.url + "/" + id)
      .subscribe(
        (data) => {
          this.isLoading = false;
          console.log('couponData', data);
          this.couponData = data;
          return true;
        },
        err => {
          this.isLoading = false;
          console.log('errorData', err);
          return true;
        });
  }

  submit() {
    console.log(this.couponData);
    this.id ? this.putCouponData() : this.postCouponData();
  }

  postCouponData() {
    this.isLoading = true;
    console.log(this.couponData);
    this.dataService.postData(this.url, this.couponData)
      .subscribe(
        (data) => {
          console.log('couponData', data);
          this.router.navigate(['dashboard/coupon-manage/view-coupon']);
          return true;
        },
        error => {
          this.isLoading = false;
          console.log('errorData', error);
          return true;
        }
      )
  }

  putCouponData() {
    this.isLoading = true;
    this.dataService.patchData(this.url, this.id, this.couponData)
      .subscribe(
        (data) => {
          this.isLoading = false;
          console.log('couponData', data);
          this.router.navigate(['dashboard/coupon-manage/view-coupon']);
          return true;
        },
        error => {
          this.isLoading = false;
          console.log('errorData', error);
          return true;
        }
      )
  }



}
