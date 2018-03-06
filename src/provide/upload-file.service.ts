import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';


@Injectable()
export class UploadFileService {

  constructor(
    public http: Http
  ) { }

  uploadfile(file) {

    let file_name = new Date().getTime() + file.name;

    AWS.config.accessKeyId = 'AKIAJNHK7OBATDPIEJJA';
    AWS.config.secretAccessKey = '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';

    const s3 = new S3({
      region: 'us-east-2',
      apiVersion: '2006-03-01',
      params: { Bucket: 'wtcb/ticket' }
    });

    let params: any = { Bucket: 'wtcb/ticket', Key: file_name, Body: file, ContentType: file.type, ACL: 'public-read' };

    // s3.upload(params, function (err, data) {
    //   if (err) {
    //     console.log('There was an error uploading your file: ', err);
    //     return false;
    //   }

    //   console.log('Successfully uploaded file.', data);
    //   return true;
    // });
    // var uploadObs$ = Observable.bindNodeCallback(s3.upload);
    // return uploadObs$(params).subscribe((data)=>{
    //   console.log('Successfully uploaded file.', data);
    // }, (err)=> {
    //   console.log('There was an error uploading your file: ', err);
    // });
    let obs$ = Observable.create(observer => {

      s3.upload(params,  (err, data) => {
        if (err) {
          observer.onNext(err);
        } else {
          observer.onNext(data);

        }
        observer.onCompleted();

      });
      // Yield a single value and complete
      // observer.onNext(42);
      // observer.onCompleted();


    });

    obs$.subscribe((data)=> {
      console.log("dddddd", data);
    }, err=> {
      console.log("errrrr", err);
    })
  }

}

