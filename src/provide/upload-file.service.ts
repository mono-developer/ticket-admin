import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { Observable } from 'rxjs';
import * as Rx from 'rxjs';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/retry";


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

    var subject = new Rx.Subject();

    s3.upload(params,  (err, data) => {
      if (err) {
        subject.next(err);
      } else {
        subject.next(data);
      }
      subject.complete();
    });
    return subject;
  }

}

