import { Component, OnInit, Inject, ViewChild, NgZone, ElementRef } from '@angular/core';
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

import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { FormControl } from '@angular/forms';


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
  @ViewChild("search")
  public searchElementRef: ElementRef;

  isLinear = false;
  firstFormGroup: FormGroup;
  // secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourFormGroup: FormGroup;

  id: string;
  url: string;
  token: string;
  page_value: string;
  eventData: any = {};
  couponList: any = [];
  stateList: any;
  categoryList: any;
  organizorList: any;
  reservationList: any;

  dataSource1: any;
  dataSource2: any;
  displayedColumns1 = ['date','time', 'symbol'];
  displayedColumns2 = ['location', 'bill', 'tickets', 'type', 'symbol'];

  printCheck: boolean;
  pickCheck: boolean;
  purchaserCheck: boolean;

  isEventImge: boolean = false;
  isSeatImg: boolean = false;
  isTicketImg: boolean = false;
  isLoading: boolean = false;

  searchControl: FormControl;

  constructor(
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    public router: Router,
    public route: ActivatedRoute,
    private uploadService: UploadFileService,
    public baseService: BaseService,
    public dataService: DataService,
    private imageSize: ImageSize,

    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {
    this.stateList = [
      { id: 0, name: 'Active', status: true },
      { id: 1, name: 'Inative', status: false }
    ];

    this.reservationList = [
      { id: 0, name: 'Yes', state: true },
      { id: 1, name: 'No', state: false }
    ];

    this.eventData.s_time = { hour: 0, minute: 0, meriden: 'PM', format: 12 };
    this.eventData.e_time = { hour: 0, minute: 0, meriden: 'PM', format: 12 };
  }

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get('item');
    this.token = sessionStorage.getItem('token');
    this.page_value = this.route.snapshot.paramMap.get('value');
    console.log(this.page_value);
    this.url = this.baseService.eventURL;
    this.getCategoryData();

    //create search FormControl
    this.searchControl = new FormControl();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {

      let options = {
        language: 'en-GB',
        types: ['(cities)'],
        componentRestrictions: { country: "co" }
      }

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, options);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.eventData.place = place.formatted_address;
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          this.eventData.latitude = lat.toString();
          this.eventData.longitude = lng.toString();
          console.log('place', this.eventData.place, this.eventData.latitude, this.eventData.longitude);
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
        });
      });
    });
  }

  getEventData(id) {

    this.dataService.getNoTokenData(this.url + "/" + id)
      .subscribe(
        (data) => {
          this.isLoading = false;
          console.log(data);
          this.eventData = data;
          this.dataSource1 = new MatTableDataSource(data.event_date);
          this.dataSource2 = new MatTableDataSource(data.ticket_data);
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
    this.dataService.getNoTokenData(cate_url)
      .subscribe(
        (data) => {
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
    let org_url = this.baseService.organizorURL;
    this.dataService.getNoTokenData(org_url)
      .subscribe(
        (data) => {
          this.organizorList = data;
          this.getCouponData();
          return true;
        },
        err => {
          this.isLoading = false;
          console.log('errorData', err);
          return true;
        });
  }

  getCouponData() {
    let cp_url = this.baseService.couponURL;
    this.dataService.getData(cp_url, this.token)
      .subscribe(
        (data) => {
          this.couponList = data;
          if (this.id) {
            this.getEventData(this.id);
          } else {
            this.isLoading = false;
          }
          return true;
        },
        err => {
          this.isLoading = false;
          console.log('errorData', err);
          return true;
        });
  }

  addOrg() {
    this.router.navigate(['/dashboard/organizor-manage/add-organizor']);
  }

  openEventDialog(): void {
    let modalData: any = {
      date: '',
      time: { hour: 0, minute: 0, meriden: 'PM', format: 12 }
    };

    let dialogRef1 = this.dialog.open(EventDatailsDialogComponent, {
      width: '350px',
      data: { modalData: modalData }
    });

    dialogRef1.afterClosed().subscribe(result => {
      if(result == undefined){
      }else{
        console.log(result);
        this.eventData.event_date == undefined ? this.eventData.event_date = [] : console.log(this.eventData.event_date);
        this.eventData.event_date.push(result);
        this.dataSource1 = new MatTableDataSource(this.eventData.event_date);
      }
    });
  }

  editEvent(item: any): void {
    let dialogRef1 = this.dialog.open(EventDatailsDialogComponent, {
      width: '350px',
      data: { modalData: item }
    });
    dialogRef1.afterClosed();
  }

  deleteEvent(index) {
    this.eventData.event_date.splice(index, 1);
    this.dataSource1 = new MatTableDataSource(this.eventData.event_date);
  }

  openSeatDialog(): void {
   let modalData: any = {};
    modalData.sale_stime = { hour: 0, minute: 0, meriden: 'PM', format: 12 };
    modalData.sale_etime = { hour: 0, minute: 0, meriden: 'PM', format: 12 }

    let dialogRef = this.dialog.open(SeatDatailsDialogComponent, {
      width: '470px',
      data: { modalData: modalData}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == undefined) {
        console.log('undefined');
      } else {
        this.eventData.ticket_data == undefined ? this.eventData.ticket_data = [] : console.log(this.eventData.ticket_data);
        this.eventData.ticket_data.push(result);
        console.log(this.eventData.ticket_data);
        this.dataSource2 = new MatTableDataSource(this.eventData.ticket_data);
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
    this.eventData.ticket_data.splice(index, 1);
    this.dataSource2 = new MatTableDataSource(this.eventData.ticket_data);
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
          this.eventData.event_img = image;
        });
      }else{
        this.isEventImge = true;
      }
    });
  }

  seatImage(event: any) {

    const file = event.target.files[0];
    this.imageSize.sizeImage(file, (size) => {
      if (size.width == 524 && size.height == 365) {
        this.uploadImage(file, (image) => {
          this.eventData.seat_img = image;
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
          this.eventData.ticket_img = image;
        })
      } else {
        console.log('error');
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
    this.dataService.postData(this.url, this.token ,this.eventData)
      .subscribe(
        (data) => {
          this.router.navigate(['dashboard/event-manage/view-event']);
          return true;
        },
        error => {
          this.isLoading = false;
          console.log('errorData', error);
          return true;
        });
  }

  putEventData() {
    this.isLoading = true;
    this.dataService.patchData(this.url, this.id, this.token, this.eventData)
      .subscribe(
        (data) => {
          this.isLoading = false;
          console.log('eventData', data);
          this.router.navigate(['dashboard/event-manage/view-event']);
          return true;
        },
        error => {
          this.isLoading = false;
          console.log('errorData', error);
          return true;
        });
  }

  done(){
    console.log(this.eventData);
    this.id && this.page_value == 'edit' ? this.putEventData() : this.postEventData();
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

  boxList: any;
  public isLoading: boolean = false;

  constructor(
    private alerts: AlertsService,
    private uploadService: UploadFileService,
    public dialogRef2: MatDialogRef<SeatDatailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data);
      this.boxList = [
        { id: 0, name: "Yes", value: true },
        { id: 1, name: "No", value: false }
      ];
    }

  onNoClick(): void {
    this.dialogRef2.close();
  }

}
