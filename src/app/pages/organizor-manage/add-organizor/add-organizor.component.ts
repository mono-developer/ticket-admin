import { Component, OnInit } from '@angular/core';
import { routeAnimation } from "../../../route.animation";
import { Router, ActivatedRoute } from "@angular/router";
import { BaseService } from "../../../../provide/base-service";
import { DataService } from "../../../../provide/data-service";

@Component({
  selector: 'ms-add-organizor',
  templateUrl: './add-organizor.component.html',
  styleUrls: ['./add-organizor.component.scss'],
  host: {
    '[@routeAnimation]': 'true'
  },
  animations: [routeAnimation]
})
export class AddOrganizorComponent implements OnInit {

  page_title : string = "Add Organizor";
  id: string;
  url: string;
  stateList: any;
  orgData: any ;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public baseService: BaseService,
    public dataService: DataService
  ) {
    this.orgData = {
      name: '',
      number: '',
      person: '',
      eamil: '',
      mobile: '',
      address: '',
      value: ''
    };
    this.stateList = [ { id: 0, name: 'Activate', value: true },
                       { id: 1, name: 'Deactivate', value: false }
                    ];
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('item');
    this.url = this.baseService.organizorURL;
    console.log('item', this.id);
    if (this.id) {
      this.getOrgData(this.id);
    } else {
      this.orgData = {
        name: '',
        number: '',
        person: '',
        eamil: '',
        mobile: '',
        address: '',
        value: ''
      };
    }
  }

  getOrgData(id) {
    this.isLoading = true;
    this.dataService.getData(this.url + "/" + id)
      .subscribe(
        (data) => {
          this.isLoading = false;
          console.log('orgData', data);
          this.orgData = data;
          return true;
        },
        err => {
          this.isLoading = false;
          console.log('errorData', err);
          return true;
        });
  }


  submit() {
    console.log(this.orgData);
    this.id ? this.putOrgData() : this.postOrgData();
  }

  putOrgData() {
    this.isLoading = true;
    this.dataService.patchData(this.url, this.id, this.orgData)
      .subscribe(
        (data) => {
          console.log('orgData', data);
          this.router.navigate(['organizor-manage/view-organizor']);
          return true;
        },
        error => {
          this.isLoading = false;
          console.log('errorData', error);
          return true;
        });
  }

  postOrgData() {

    this.isLoading = true;
    this.dataService.postData(this.url, this.orgData)
      .subscribe(
        (data) => {
          console.log('cmsData', data);
          this.router.navigate(['organizor-manage/view-organizor']);
          return true;
        },
        error => {
          this.isLoading = false;
          console.log('errorData', error);
          return true;
        });
  }



}
