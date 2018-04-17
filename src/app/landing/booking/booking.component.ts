import { Component, OnInit, AfterViewInit, Inject, NgZone, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { BaseService } from "../../../provide/base-service";
import { DataService } from "../../../provide/data-service";
import { Observable } from 'rxjs/Rx';

import { AgmCoreModule } from '@agm/core';
import { MouseEvent } from '@agm/core';
import { select } from 'd3';


@Component({
  selector: 'ms-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {

  id: string;
  isLinear: boolean = false;
  event_date: any = {time: '', date: ''};
  s__Location: any = {};
  s__quantity: number = 1;
  s__ballot: any;
  eventData: any;
  organizerData: any = {};
  categoryData: any = {};
  customerInfo: any;
  isStep1Table: boolean = false;
  isStep2Table: boolean = false;
  ticket: any;
  ballotList: any;
  bookingInfo: any = {};
  pseInfo: any = {};

  id_number: string;
  id_type: string;
  complete_name: string;
  address: string;
  phone: string;

  // Set timer counter
  progressValue: any = 0;
  total_timer: any = 0;
  second: any = 0;
  minute: number = 0;

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public baseService: BaseService,
    public dataService: DataService
  ) {
    this.eventData = {};
    this.ballotList = [
      { value: 0, title: 'Print the ballot direct.' },
      { value: 1, title: 'Pick ticket at sale point.' },
      { value: 2, title: 'Purchasers will send the tickets at an additional cost.'}
    ];
    this.id = this.route.snapshot.paramMap.get('id');
    let cusName = this.route.snapshot.paramMap.get('customName');
    let cusEmail = this.route.snapshot.paramMap.get('customEmail');
    this.customerInfo = { name: cusName, email: cusEmail };
    console.log(this.customerInfo);

   }

  ngOnInit() {
    let url = this.baseService.eventURL;
    console.log(this.id, url);
    this.getEventData(this.id, url);
  }

  getEventData(id, url) {
    this.dataService.getNoTokenData(url + "/" + id)
      .subscribe(
        (data) => {
          // this.isLoading = false;
          console.log(data);
          this.eventData = data;
          this.organizerData = data.organization;
          this.categoryData = data.category;
          this.timeInterval();
          return true;
        },
        err => {
          // this.isLoading = false;
          console.log('errorData', err);
          return true;
        });
  }

  timeInterval() {

    let timer = Observable.timer(30, 100);
    const subscription = timer.subscribe(t => {
      this.total_timer = t/10;
      this.minute = Math.floor(this.total_timer / 60);
      let second = this.total_timer%60;
      if(this.total_timer % 60 == 0){
        this.second = "00";
      }else if(this.total_timer%60 > 0 && this.total_timer % 60 <10){
        this.second = "0" + second.toString().slice(0, 1);
      }else{
        this.second = second.toString().slice(0, 2);
      }

      this.progressValue = t/30;
      if (this.progressValue == 100) {
        subscription.unsubscribe();
        // this.isTimerOver(this.customerInfo.name);
        this.openSnackBar(this.customerInfo.name)
      }
    });
  }

  openSnackBar(name) {
    let aa = this.snackBar.openFromComponent(TimeOverComponent, {
      duration: 2000,
    });

    aa.afterDismissed().subscribe(() => {
      this.router.navigate(['']);
    });
  }

  openLocationDialog(data): void {
    let dialogRef = this.dialog.open(LocationDialogComponent, {
      width: '350px',
      data: { location: data.place, lat: data.latitude, lng: data.longitude }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  onChange(value:any) {
    this.isStep1Table = !!value;
    this.event_date = {
      time: value.time,
      date: value.date
    }
    console.log(this.isStep1Table, this.event_date);
  }

  onChangedLocation(value: string){
    this.isStep2Table = !!value;
    console.log(this.eventData);
    let locationData = this.eventData.ticket_data.filter((item: any) =>
      item.location === value
    );
    this.ticket = locationData[0];
  }

  getBookingInfo() {
    console.log(this.s__quantity);
    this.bookingInfo = {
      location: this.ticket.location,
      quantity: this.s__quantity,
      price: this.ticket.ticket_price,
      total_price: this.s__quantity * Number(this.ticket.ticket_price)
    }
  }

  addQuantity() {
    this.s__quantity++;
    console.log(this.s__quantity);
  }
  minQuantity() {
    this.s__quantity--;
    console.log(this.s__quantity);
  }

  getPSE() {
    console.log(this.pseInfo);
  }

}

@Component({
  templateUrl: 'time-over.component.html',
  styleUrls: ['./booking.component.scss']
})
export class TimeOverComponent {
  constructor() { }
}

@Component({
  templateUrl: 'location-dialog.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class LocationDialogComponent {

  // google maps zoom level
  zoom: number = 15;
  lat: number;
  lng: number;
  marker: any;
  styles = null;

  constructor(
    private ngZone: NgZone,
    public dialogRef: MatDialogRef<LocationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(this.data)
    this.lat = Number(data.lat);
    this.lng = Number(data.lng);
    console.log(this.lng, this.lat);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.marker =
      {
        lat: this.lat,
        lng: this.lng,
        label: this.data.location,
        draggable: true
      }
  }

  clickedMarker() {
    console.log('clicked the marker:', this.marker.label)
  }

}
  // just an interface for type safety.
  interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}





