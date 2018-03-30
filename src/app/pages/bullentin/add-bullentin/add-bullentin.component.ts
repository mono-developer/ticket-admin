import { Component, OnInit } from '@angular/core';
import { routeAnimation } from "../../../route.animation";
import { Router, ActivatedRoute } from "@angular/router";
import { BaseService } from "../../../../provide/base-service";
import { DataService } from "../../../../provide/data-service";
import * as _ from 'lodash';

@Component({
  selector: 'ms-add-bullentin',
  templateUrl: './add-bullentin.component.html',
  styleUrls: ['./add-bullentin.component.scss'],
  host: {
    '[@routeAnimation]': 'true'
  },
  animations: [routeAnimation]
})
export class AddBullentinComponent implements OnInit {


  page_title: string = 'Add NewsLetter';
  id: string;
  url: string;
  letterData: any;
  isLoading: boolean = false;
  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public baseService: BaseService,
    public dataService: DataService
  ) {
    this.letterData = { title: '', description: '' };
   }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('item');
    this.url = this.baseService.newsLetterURL;
    console.log('item', this.id);
    if (this.id) {
      this.getNewsLetterData(this.id);
    } else {
      this.letterData = { title: '', description: '' };
    }
  }

  getNewsLetterData(id) {
    this.isLoading = true;
    this.dataService.getData(this.url + "/" + id)
      .subscribe(
        (data) => {
          this.isLoading = false;
          console.log('letterData', data);
          this.letterData = data;
          return true;
        },
        err => {
          this.isLoading = false;
          console.log('errorData', err);
          return true;
        });
  }

  submit() {
    console.log(this.letterData);
    this.id ? this.putLetterData() : this.postLetterData();
  }

  postLetterData() {
    this.isLoading = true;
    this.dataService.postData(this.url, this.letterData)
      .subscribe(
        (data) => {
          console.log('letterData', data);
          this.router.navigate(['dashboard/bullentin/view-bullentin']);
          return true;
        },
        error => {
          this.isLoading = false;
          console.log('errorData', error);
          return true;
        }
      )
  }

  putLetterData() {
    this.isLoading = true;
    this.dataService.patchData(this.url, this.id, this.letterData)
      .subscribe(
        (data) => {
          console.log('letterData', data);
          this.isLoading = false;
          this.router.navigate(['dashboard/bullentin/view-bullentin']);
          return true;
        },
        error => {
          this.isLoading = false;
          console.log('errorData', error);
          return true;
        }
      )
  }

  getEscaped(text: string) {
    return _.escape(text);
  }

}
