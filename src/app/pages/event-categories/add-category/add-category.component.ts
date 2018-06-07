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
  token: string;
  categoryData: any;
  categoryList: any;
  iconList: any;
  isLoading: boolean = false;
  stateList: any;

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public baseService: BaseService,
    public dataService: DataService
  ) {

    this.categoryData = { name: '', value: '' };
    this.stateList = [
      { id: 0, name: 'Active', value: true },
      { id: 1, name: 'Deative', value: false }
    ];
    this.iconList = [
      { id: 0, name: 'Library Music', icon: 'library_music' },
      { id: 1, name: 'Queue Music', icon: 'queue_music' },
      { id: 1, name: 'Family', icon: 'group' },
      { id: 1, name: 'Circus', icon: 'music_note' },
      { id: 1, name: 'Device Bub', icon: 'device_hub' },
      { id: 1, name: 'Fintness Center', icon: 'fitness_center' },
      { id: 1, name: 'Information', icon: 'info_outline' }
    ];
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('item');
    this.url = this.baseService.categoryURL;
    this.token = sessionStorage.getItem('token');
    if (this.id) {
      this.getCategoryData(this.id);
    } else {
      this.categoryData = { };
    }
  }

  getCategoryData(id) {
    this.isLoading = true;
    this.dataService.getData(this.url + "/" + id, this.token)
      .subscribe(
        (data) => {
          this.isLoading = false;
          this.categoryData = data;
          return true;
        },
        err => {
          this.isLoading = false;
          return true;
        });
  }

  submit(){
    this.id ? this.putCategoryData() : this.postCategoryData();
  }

  postCategoryData() {
    this.isLoading = true;
    this.dataService.postData(this.url, this.token, this.categoryData)
      .subscribe(
        (data) => {
          this.router.navigate(['dashboard/event-categories/view-category']);
          return true;
        },
        error => {
          this.isLoading = false;
          return true;
        });
  }

  putCategoryData() {
    this.isLoading = true;
    this.dataService.patchData(this.url, this.id, this.token, this.categoryData)
      .subscribe(
        (data) => {
          this.isLoading = false;
          this.router.navigate(['dashboard/event-categories/view-category']);
          return true;
        },
        error => {
          this.isLoading = false;
          return true;
        }
      )
  }

}
