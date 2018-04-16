import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { fadeInAnimation } from "../../../route.animation";
import { BaseService } from "../../../../provide/base-service";
import { UserService } from "../../../../provide/user-service";
import { DataService } from "../../../../provide/data-service";
import { UploadFileService } from '../../../../provide/upload-file.service';
import { Observable } from 'rxjs/Rx';

import * as _ from 'lodash';


@Component({
  selector: 'ms-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [ fadeInAnimation ]
})
export class ProfileComponent implements OnInit {

  userInfo: any;
  url: string;
  token: string;
  isLoading: boolean;
  constructor(
    private router: Router,
    public baseService: BaseService,
    public userService: UserService,
    public dataService: DataService,
    private uploadService: UploadFileService,

  ) {  }

  ngOnInit() {
    this.url = this.baseService.userURL;
    this.token = sessionStorage.getItem('token');
    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    console.log(this.userInfo);

  }

  updatePhoto(event) {
    const file = event.target.files[0];
    this.uploadImage(file, (image) => {
      this.userInfo.photo = image;
      this.updateProfile();
    })
  }

  uploadImage(file, callback) {
    this.isLoading = true;
    this.uploadService.uploadfile(file).subscribe((data: any) => {
      this.isLoading = false;
      let imageURL = data.Location;
      callback(imageURL);
    }, (err) => {
      this.isLoading = false;
      console.log("errror", err);
    });
  }

  updateProfile() {
    console.log(this.userInfo);
    this.userService.updateProfile(this.url, this.userInfo._id, this.userInfo, this.token)
      .subscribe(
        (data) => {
          this.isLoading = false;
          if (data.status == "Success"){

            console.log('userData', data);
            sessionStorage.setItem('userInfo', JSON.stringify(data.user));
            return true;
          }
        },
        error => {
          this.isLoading = false;
          console.log('errorData', error);
          return true;
        });
  }

}

