import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { json } from 'd3';

import { BaseService } from "../../../../provide/base-service";
import { DataService } from "../../../../provide/data-service";
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';

@Component({
  selector: 'ms-view-sale-users',
  templateUrl: './view-sale-users.component.html',
  styleUrls: ['./view-sale-users.component.scss']
})
export class ViewSaleUsersComponent implements OnInit {
  page_title: string = 'Management of sales teams';
  url: string;
  token: string;
  usersList: Element[];
  displayedColumns = ['name', 'email', 'phone', 'city', 'state', 'symbol'];
  dataSource: any;
  isLoading: boolean = false;

  constructor(
    public router: Router,
    public dialog: MatDialog,
    public baseService: BaseService,
    public dataService: DataService) {
   }

  ngOnInit() {
    this.url = this.baseService.userURL;
    this.token = sessionStorage.getItem('token');
    this.getSalesUserList();
  }

  getSalesUserList() {
    this.isLoading = true;
    this.dataService.getData(this.url, this.token)
      .subscribe(
        (data) => {
          this.isLoading = false;
          console.log('salesList', data);
          this.usersList = data.filter((item: any) =>
            item.access === '2'
          );
          this.dataSource = new MatTableDataSource(this.usersList);
          return true;
        },
        err => {
          this.isLoading = false;
          console.log('errorData', err);
          return true;
        });
  }

  edit(item: any) {
    this.router.navigate(['dashboard/sales-point/add-sale-users', { item: item._id }]);
  }

  delete(item) {
    let dialogRef1 = this.dialog.open(DeleteDialogComponent, {
      width: '350px',
      data: {
        alert: `
      If you delete this item, it will delete all Events that are connected with this Seller.
      Do you want to delete this seller from list? ` }
    });
    dialogRef1.afterClosed().subscribe(result => {
      result ? this.deleteSeller(item._id) : '';
    });
  }

  deleteSeller(id) {
    this.isLoading = true;
    this.dataService.deleteData(this.url, id, this.token)
      .subscribe(
        (data) => {
          console.log('cmsData', data);
          this.getSalesUserList();
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

