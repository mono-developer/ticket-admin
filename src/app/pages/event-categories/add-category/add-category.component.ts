import { Component, OnInit } from '@angular/core';
import { routeAnimation } from "../../../route.animation";
import { Router, ActivatedRoute } from "@angular/router";
import { BaseService } from "../../../../provide/base-service";
import { DataService } from "../../../../provide/data-service";
import * as _ from 'lodash';

@Component({
  selector: 'ms-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
  host: {
    '[@routeAnimation]': 'true'
  },
  animations: [routeAnimation]
})
export class AddCategoryComponent implements OnInit {

  page_title: string = "Add Category";
  id: string;
  url: string;
  categoryData: any;
  categoryList: any;
  isLoading: boolean = false;
  stateList: any;

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public baseService: BaseService,
    public dataService: DataService
  ) {

    this.categoryData = { name: '', value: '' };
    this.stateList = [ { id: 0, name: 'Active', value: true },
                       { id: 1, name: 'Deative', value: false }
                    ];
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('item');
    this.url = this.baseService.categoryURL;
    console.log('item', this.id);
    if (this.id) {
      this.getCategoryData(this.id);
    } else {
      this.categoryData = { name: '', value: '' };
    }
  }

  getCategoryData(id) {
    this.isLoading = true;
    this.dataService.getData(this.url + "/" + id)
      .subscribe(
        (data) => {
          this.isLoading = false;
          console.log('letterData', data);
          this.categoryData = data;
          return true;
        },
        err => {
          this.isLoading = false;
          console.log('errorData', err);
          return true;
        });
  }

  submit(){
    console.log(this.categoryData);
    this.id ? this.putCategoryData() : this.postCategoryData();
  }


  postCategoryData() {
    this.isLoading = true;
    this.dataService.postData(this.url, this.categoryData)
      .subscribe(
        (data) => {
          console.log('categoryData', data);
          this.router.navigate(['event-categories/view-category']);
          return true;
        },
        error => {
          this.isLoading = false;
          console.log('errorData', error);
          return true;
        }
      )
  }

  putCategoryData() {
    this.isLoading = true;
    this.dataService.patchData(this.url, this.id, this.categoryData)
      .subscribe(
        (data) => {
          console.log('categoryData', data);
          this.router.navigate(['event-categories/view-category']);
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
