import { Component, OnInit, Inject } from '@angular/core';
import {fadeInAnimation} from "../../../route.animation";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource} from '@angular/material';
import { AlertsService } from 'angular-alert-module';
import { UploadFileService } from '../../../../provide/upload-file.service';
import { select } from 'd3';
import { Observable } from 'rxjs';

import { BaseService } from "../../../../provide/base-service";
import { DataService } from "../../../../provide/data-service";
import { ImageSize } from "../../../../provide/image-size";

@Component({
  selector: 'ms-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
  host: {
    "[@fadeInAnimation]": 'true'
  },
  animations: [ fadeInAnimation ]
})
export class AddEventComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourFormGroup: FormGroup;

  id: string;
  url: string;
  eventData: any;
  couponList: any = [];
  stateList: any;
  categoryList: any;
  organizationList: any;

  dataSource1: any;
  dataSource2: any;
  displayedColumns1 = ['date', 'symbol'];
  displayedColumns2 = ['location', 'bill', 'tickets', 'type', 'symbol'];

  printCheck: boolean;
  pickCheck: boolean;
  purchaserCheck: boolean;

  isEventImge: boolean = false;
  isSeatImg: boolean = false;
  isTicketImg: boolean = false;

  isLoading: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    public router: Router,
    public route: ActivatedRoute,
    private uploadService: UploadFileService,
    public baseService: BaseService,
    public dataService: DataService,
    private imageSize: ImageSize,
  ) {
    this.stateList = [  { id: 0, name: 'Active', state: true },
                        { id: 1, name: 'Inative', state: false }
                      ];
    this.eventData = {
          category_id: '',
          event_name: '',
          meeting_place: '',
          city: '',
          org_id: '',
          event_details: [],
          seat_details: [],
          event_bg: '',
          event_map: '',
          coupon_id: '',
          ticket_image: '',
          value_print: false,
          value_pick: false,
          value_purchaser: false,
          add_info: '',
          program_info: '',
          status: ''
      }

  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
    // this.fourFormGroup = this._formBuilder.group({
    //   fourCtrl: ['', Validators.required]
    // });
    this.id = this.route.snapshot.paramMap.get('item');
    this.url = this.baseService.eventURL;
    this.getCategoryData();
  }

  getEventData(id) {

    this.dataService.getData(this.url + "/" + id)
      .subscribe(
        (data) => {
          this.isLoading = false;
          console.log('eventData', data);
          this.eventData = data;
          this.dataSource1 = new MatTableDataSource(this.eventData.event_details);;
          this.dataSource2 = new MatTableDataSource(this.eventData.seat_details);;
          return true;
        },
        err => {
          this.isLoading = false;
          console.log('errorData', err);
          return true;
        });
  }

  getCategoryData() {
    this.isLoading = true;
    let cate_url = this.baseService.categoryURL;
    this.dataService.getData(cate_url)
      .subscribe(
        (data) => {
          console.log('categoryData', data);
          this.categoryList = data;
          this.getOrgData();
          return true;
        },
        err => {
          this.isLoading = false;
          console.log('errorData', err);
          return true;
        });
  }

  getOrgData() {
    let org_url = this.baseService.organizationURL;
    this.dataService.getData(org_url)
      .subscribe(
        (data) => {
          console.log('orgData', data);
          this.organizationList = data;
          this.getCouponData();
          return true;
        },
        err => {
          console.log('errorData', err);
          return true;
        });
  }

  getCouponData() {
    let org_url = this.baseService.couponURL;
    this.dataService.getData(org_url)
      .subscribe(
        (data) => {
          console.log('couponList', data);
          this.couponList = data;
          if(this.id){
            this.getEventData(this.id);
          }else{
            this.isLoading = false;
          }
          return true;
        },
        err => {
          console.log('errorData', err);
          return true;
        });
  }

  addOrg() {
    this.router.navigate(['organization-manage/add-organization']);
  }

  openEventDialog(): void {
    let modalData: any = {
      date: '',
      time: ''
    };

    let dialogRef1 = this.dialog.open(EventDatailsDialogComponent, {
      width: '470px',
      data: { modalData: modalData }
    });

    dialogRef1.afterClosed().subscribe(result => {
      if(result == undefined){
        console.log(result);
      }else{
        this.eventData.event_details.push(result);
        console.log(this.eventData.event_details);
        this.dataSource1 = new MatTableDataSource(this.eventData.event_details);
      }
    });
  }

  editEvent(item: any): void {
    let dialogRef1 = this.dialog.open(EventDatailsDialogComponent, {
      width: '470px',
      data: { modalData: item }
    });
    dialogRef1.afterClosed();
  }

  deleteEvent(index) {
    this.eventData.event_details.splice(index, 1);
    this.dataSource1 = new MatTableDataSource(this.eventData.event_details);
  }

  openSeatDialog(): void {

   let modalData: any = {};

    let dialogRef = this.dialog.open(SeatDatailsDialogComponent, {
      width: '470px',
      data: { modalData: modalData}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == undefined) {
        console.log('undefined');
      } else {
        console.log(result);
        this.eventData.seat_details.push(result);
        this.dataSource2 = new MatTableDataSource(this.eventData.seat_details);
      }
    });
  }

  editSeat(item): void {
    let dialogRef = this.dialog.open(SeatDatailsDialogComponent, {
      width: '470px',
      data: { modalData: item }
    });
    dialogRef.afterClosed();
  }

  deleteSeat(index) {
    this.eventData.seat_details.splice(index, 1);
    this.dataSource2 = new MatTableDataSource(this.eventData.seat_details);
  }

  convertDate(date) {
    let newDate = date.toString();
    return newDate.substr(0, 15)
  }

  //  Step 3

  eventImage(event: any) {
    const file = event.target.files[0];
    this.imageSize.sizeImage(file, (size)=>{
      if (size.width == 1080 && size.height == 400) {
        this.uploadImage(file, (image)=>{
          this.eventData.event_bg = image;
        });
      }else{
        console.log('fdsafds');
        this.isEventImge = true;
      }
    });
  }

  seatImage(event: any) {

    const file = event.target.files[0];
    this.imageSize.sizeImage(file, (size) => {
      if (size.width == 524 && size.height == 365) {
        this.uploadImage(file, (image) => {
          this.eventData.event_map = image;
        })
      } else {
        this.isSeatImg = true;
      }
    });
  }

  ticketImage(event: any) {

    const file = event.target.files[0];
    this.imageSize.sizeImage(file, (size) => {
      if (size.width == 590 && size.height == 968) {
        this.uploadImage(file, (image) => {
          this.eventData.ticket_image = image;
        })
      } else {
        console.log('fdsafdsa');
        this.isTicketImg = true;
      }
    });
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

  postEventData() {
    this.isLoading = true;
    this.dataService.postData(this.url, this.eventData)
      .subscribe(
        (data) => {
          console.log('eventData', data);
          this.router.navigate(['event-manage/view-event']);
          return true;
        },
        error => {
          this.isLoading = false;
          console.log('errorData', error);
          return true;
        }
      )
  }

  putEventData() {
    this.isLoading = true;
    this.dataService.patchData(this.url, this.id, this.eventData)
      .subscribe(
        (data) => {
          this.isLoading = false;
          console.log('eventData', data);
          this.router.navigate(['event-manage/view-event']);
          return true;
        },
        error => {
          this.isLoading = false;
          console.log('errorData', error);
          return true;
        }
      )
  }

  done(){
    console.log(this.eventData);
    this.id ? this.putEventData() : this.postEventData();
  }

}

// Event Details Dialog
@Component({
  selector: 'event-details-dialog',
  templateUrl: './event-details-dialog.component.html',
  styleUrls: ['./event-dialog.component.scss'],
})
export class EventDatailsDialogComponent {

  constructor(
    public dialogRef1: MatDialogRef<EventDatailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef1.close();
  }
}
// Seat Deails Dialog
@Component({
  selector: 'seat-details-dialog',
  templateUrl: './seat-details-dialog.component.html',
  styleUrls: ['./event-dialog.component.scss'],
})
export class SeatDatailsDialogComponent {
  boxList: any = [  { id: 0, name: "Yes", value: true },
                    { id: 1, name: "No", value: false }
                  ];
  public isLoading: boolean = false;
  // private isGetImage: boolean = false;

  constructor(
    private alerts: AlertsService,
    private uploadService: UploadFileService,
    public dialogRef2: MatDialogRef<SeatDatailsDialogComponent>,
    private imageSize: ImageSize,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  onNoClick(): void {
    this.dialogRef2.close();
  }

  fileEvent(event: any) {
    const file = event.target.files[0];
    this.imageSize.sizeImage(file, (size)=>{
      if (size.width == 960 && size.height == 450) {
        this.uploadImage(file, (image)=>{
          console.log(image);
          this.data.modalData.detail_img = image;
        })
      } else {
        // this.isGetImage = true;
      }
    });
  }

  uploadImage(file, callback) {
    this.isLoading = true;
    this.uploadService.uploadfile(file).subscribe((data: any) => {
      this.isLoading = false;
      let imageURL = data.Location;
      console.log(imageURL);
      callback(imageURL);
    }, (err) => {
      this.isLoading = false;
      console.log("errror", err);
    });
  }
}


