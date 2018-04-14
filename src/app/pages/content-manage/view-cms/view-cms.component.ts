import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { Router } from '@angular/router';
import { json } from 'd3';

import { BaseService } from "../../../../provide/base-service";
import { DataService } from "../../../../provide/data-service";

@Component({
  selector: 'ms-view-cms',
  templateUrl: './view-cms.component.html',
  styleUrls: ['./view-cms.component.scss']
})
export class ViewCMSComponent implements OnInit {

  page_title: string = 'View Pages';
  url: string;
  token: string;
  cmsList: Element[];
  displayedColumns = ['title', 'description', 'state', 'symbol'];
  dataSource:any;
  isLoading: boolean;

  constructor(
    public router: Router,
    public baseService: BaseService,
    public dataService: DataService
  ) { }

  ngOnInit() {
    this.url = this.baseService.contentURL;
    this.token = sessionStorage.getItem('token');
    console.log(this.url);
    this.getcmsList();
  }

  getcmsList(){
    this.isLoading = true;
    this.dataService.getData(this.url, this.token)
      .subscribe(
        (data) => {
          this.isLoading = false;
          console.log('cmsList', data);
          this.cmsList = data;
          this.dataSource = new MatTableDataSource(this.cmsList);
          return true;
        },
        err => {
          this.isLoading = false;
          console.log('errorData', err);
          return true;
        });
  }

  edit(item: any) {
    this.router.navigate(['dashboard/content-manage/add-cms', { item: item._id }]);
  }

  delete(item) {
    this.isLoading = true;
    this.dataService.deleteData(this.url, item._id, this.token)
      .subscribe(
        (data) => {
          console.log('cmsData', data);
          this.getcmsList();
          return true;
        },
        error => {
          this.isLoading = false;
          console.log('errorData', error);
          return true;
        }
      )
  }

  newCMS() {
    this.router.navigate(['dashboard/content-manage/add-cms']);
  }

  goSubpage(item) {
    console.log(item);
  }

}


