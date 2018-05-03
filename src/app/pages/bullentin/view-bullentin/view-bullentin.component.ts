import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { Router } from '@angular/router';
import { json } from 'd3';
import { BaseService } from "../../../../provide/base-service";
import { DataService } from "../../../../provide/data-service";

@Component({
  selector: 'ms-view-bullentin',
  templateUrl: './view-bullentin.component.html',
  styleUrls: ['./view-bullentin.component.scss']
})
export class ViewBullentinComponent implements OnInit {
  page_title: string = 'View Newsletter';
  url: string;
  token: string;
  letterList: any;
  displayedColumns = ['title', 'description', 'symbol'];
  dataSource: any;
  isLoading: boolean = false;

  constructor(
    public router: Router,
    public baseService: BaseService,
    public dataService: DataService
  ) { }

  ngOnInit() {
    this.url = this.baseService.newsLetterURL;
    this.token = sessionStorage.getItem('token');
    this.getNewsLetterList();
  }

  getNewsLetterList() {
    this.isLoading = true;
    this.dataService.getData(this.url, this.token)
      .subscribe(
        (data) => {
          this.isLoading = false;
          console.log('letterList', data);
          this.letterList = data;
          this.dataSource = new MatTableDataSource(this.letterList);
          return true;
        },
        err => {
          this.isLoading = false;
          console.log('errorData', err);
          return true;
        });
  }

  edit(item: any) {
    console.log("senddata",item);
    this.router.navigate(['dashboard/bullentin/add-bullentin', { item: item._id }]);
  }

  delete(item: any) {
    this.isLoading = true;
    this.dataService.deleteNoTokenData(this.url, item._id)
      .subscribe(
        (data) => {
          console.log('letterList', data);
          this.isLoading = false;
          this.getNewsLetterList();
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

