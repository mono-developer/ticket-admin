import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { Router } from '@angular/router';
import { json } from 'd3';
import { BaseService } from "../../../../provide/base-service";
import { DataService } from "../../../../provide/data-service";

@Component({
  selector: 'ms-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.scss']
})
export class ViewCategoryComponent implements OnInit {
  page_title: string = 'Event Categories';
  url: string;
  token: string;
  categoryList: any;
  displayedColumns = ['category', 'state', 'symbol'];
  dataSource: any;
  isLoading: boolean = false;

  constructor(
    public router: Router,
    public baseService: BaseService,
    public dataService: DataService
  ) { }

  ngOnInit() {
    this.url = this.baseService.categoryURL;
    this.token = sessionStorage.getItem('token');
    this.getCategoryList();
  }

  getCategoryList() {
    this.isLoading = true;
    this.dataService.getNoTokenData(this.url)
      .subscribe(
        (data) => {
          this.isLoading = false;
          console.log('categoryList', data);
          this.categoryList = data;
          this.dataSource = new MatTableDataSource(this.categoryList);
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
    this.router.navigate(['dashboard/event-categories/add-category', { item: item._id }]);
  }

  delete(item: any) {
    this.isLoading = true;
    this.dataService.deleteData(this.url, item._id, this.token)
      .subscribe(
        (data) => {
          console.log('categoryList', data);
          this.getCategoryList();
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
