import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { fadeInAnimation } from "../../../route.animation";
import { ActivatedRoute } from '@angular/router';
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

  page_title: string = 'Add New Page';
  id: string;
  url: string;
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

    this.stateList = [ { id: 0, name: 'Active', state: true},
                       { id: 1, name: 'Deactivate', state: false}
                    ];
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('item');
    this.url = this.baseService.contentURL;
    console.log('item', this.id);
    if(this.id){
      this.getcmsData(this.id);
    }else{
      this.cmsData = { title: '', description: '', state: '' };
    }
  }

  getcmsData(id) {
    this.isLoading = true;
    this.dataService.getData(this.url + "/" + id)
      .subscribe(
        (data) => {
          this.isLoading = false;
          console.log('cmsData', data);
          this.cmsData = data;
          return true;
        },
        err => {
          this.isLoading = false;
          console.log('errorData', err);
          return true;
        });
  }

  setNewUser(value) {
    console.log('selected');
  }

  submit() {
    console.log( this.cmsData);
    this.id ? this.putcmsData() : this.postcmsData();
  }

  postcmsData() {
    this.isLoading = true;
    this.dataService.postData(this.url, this.cmsData)
      .subscribe(
        (data) => {
          console.log('cmsData', data);
          this.router.navigate(['content-manage/view-cms']);
          return true;
        },
        error => {
          this.isLoading = false;
          console.log('errorData', error);
          return true;
        }
      )
  }

  putcmsData() {
    this.isLoading = true;
    this.dataService.patchData(this.url, this.id, this.cmsData)
      .subscribe(
        (data) => {
          console.log('cmsData', data);
          this.router.navigate(['content-manage/view-cms']);
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
