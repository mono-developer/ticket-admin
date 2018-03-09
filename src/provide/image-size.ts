import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class ImageSize {

  image: any;
  constructor(public http: Http) {
    console.log('Hello BaseService Provider');
  }

  sizeImage(file: any, callback) {
    let width, height, size;
    let img = new Image();
    img.src = window.URL.createObjectURL(file);
    img.onload = function () {
      width = img.naturalWidth;
      height = img.naturalHeight;
      size = { width: width, height: height}
      callback(size);
    }

  }


}
