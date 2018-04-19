import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';
import { json } from 'd3';
import { BaseService } from "../../../../provide/base-service";
import { DataService } from "../../../../provide/data-service";
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';

@Component({
  selector: 'ms-view-coupon',
  templateUrl: './view-coupon.component.html',
  styleUrls: ['./view-coupon.component.scss']
})
export class ViewCouponComponent implements OnInit {

  page_title: string = 'View Coupons';
  url: string;
  token: string;
  couponList: any;
  displayedColumns = ['code', 'description', 'discount', 'valid_date', 'state', 'symbol'];
  dataSource: any;
  isLoading: boolean = false;

  constructor(
    public router: Router,
    public dialog: MatDialog,
    public baseService: BaseService,
    public dataService: DataService
  ) {

   }

  ngOnInit() {
    this.url = this.baseService.couponURL;
    this.token = sessionStorage.getItem('token');
    this.getCouponList();
  }

  getCouponList() {
    this.isLoading = true;
    this.dataService.getData(this.url, this.token)
      .subscribe(
        (data) => {
          this.isLoading = false;
          console.log('couponList', data);
          this.couponList = data;
          this.dataSource = new MatTableDataSource(this.couponList);
          return true;
        },
        err => {
          this.isLoading = false;
          console.log('errorData', err);
          return true;
        });
  }

  edit(item: any) {
    console.log("senddata", item);
    this.router.navigate(['dashboard/coupon-manage/add-coupon', { item: item._id }]);
  }

  delete(item) {
    let dialogRef1 = this.dialog.open(DeleteDialogComponent, {
      width: '350px',
      data: { alert: 'Do you want to delete this Item?' }
    });
    dialogRef1.afterClosed().subscribe(result => {
      result ? this.deleteItem(item.id) : '';
    });
  }

  deleteItem(id) {
    this.isLoading = true;
    this.dataService.deleteData(this.url, id, this.token)
      .subscribe(
        (data) => {
          console.log('couponList', data);
          this.getCouponList();
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
