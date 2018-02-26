import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ms-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.scss']
})
export class AddCouponComponent implements OnInit {

  page_title: string = "Add Coupon";
  stateList: any;
  couponData : any = { name: '', value: ''}

  constructor() {

    this.stateList = [ { id: 0, name: 'Activate'},
                       { id: 1, name: 'Deactivate'}
                      ];

   }

  ngOnInit() {
  }

}
