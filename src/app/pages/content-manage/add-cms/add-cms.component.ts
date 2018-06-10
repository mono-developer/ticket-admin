import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { fadeInAnimation } from "../../../route.animation";
import { BaseService } from "../../../../provide/base-service";
import { DataService } from "../../../../provide/data-service";

@Component({
  selector: 'ms-add-cms',
  templateUrl: './add-cms.component.html',
  styleUrls: ['./add-cms.component.scss'],
  host: {
    "[@fadeInAnimation]": 'true'
  },
  animations: [ fadeInAnimation ]
})
export class AddCMSComponent implements OnInit {

  id: string;
  url: string;
  token: string;
  cmsData: any;
  stateList: any;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public baseService: BaseService,
    public dataService: DataService
  ) {

    this.cmsData = { title: '', description: '', state: '' };
    this.stateList = [
      { id: 0, name: 'Active', state: true},
      { id: 1, name: 'Inative', state: false}
    ];
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('item');
    this.url = this.baseService.contentURL;
    this.token = sessionStorage.getItem('token');
    if(this.id){
      this.getcmsData(this.id);
    }else{
      this.cmsData = { title: '', description: '', state: '' };
    }
  }

  viewPage() {
    this.router.navigate(['dashboard/content-manage/view-cms']);
  }

  getcmsData(id) {
    this.isLoading = true;
    this.dataService.getData(this.url + "/" + id, this.token)
      .subscribe(
        (data) => {
          this.isLoading = false;
          this.cmsData = data;
          return true;
        },
        err => {
          this.isLoading = false;
          return true;
        });
  }

  submit() {
    this.id ? this.putcmsData() : this.postcmsData();
  }

  postcmsData() {
    this.isLoading = true;
    this.dataService.postData(this.url, this.token, this.cmsData)
      .subscribe(
        (data) => {
          this.router.navigate(['dashboard/content-manage/view-cms']);
          return true;
        },
        error => {
          this.isLoading = false;
          return true;
        })
  }

  putcmsData() {
    this.isLoading = true;
    this.dataService.patchData(this.url, this.id, this.token, this.cmsData)
      .subscribe(
        (data) => {
          this.isLoading = false;
          this.router.navigate(['dashboard/content-manage/view-cms']);
          return true;
        },
        error => {
          this.isLoading = false;
          return true;
        })
  }

}
