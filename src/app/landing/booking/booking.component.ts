import { Component, OnInit, AfterViewInit, Inject, NgZone, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { BaseService } from "../../../provide/base-service";
import { DataService } from "../../../provide/data-service";
import { Observable } from 'rxjs/Rx';


@Component({
  selector: 'ms-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {

  id: string;

  isLinear: boolean = false;
  s__Date: any;
  s__Location: any;
  s__quantity: number;
  s__ballot: any;
  eventData: any = {};
  organizorData: any = {};
  customerInfo: any = {};
  isStep1Table: boolean = false;
  isStep2Table: boolean = false;
  locationData: any;
  ballotList: any;
  bookingInfo: any = {};

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
    public baseService: BaseService,
    public dataService: DataService
  ) {
    this.ballotList = [
      { value: 0, title: 'Print the ballot direct.' },
      { value: 1, title: 'Pick ticket at sale point.' },
      { value: 2, title: 'Purchasers will send the tickets at an additional cost.'}
    ];
   }

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get('id');
    let cusName = this.route.snapshot.paramMap.get('customName');
    let cusEmail = this.route.snapshot.paramMap.get('customEmail');
    this.customerInfo = { name: cusName, email: cusEmail};
    console.log(this.customerInfo);
    let url = this.baseService.eventURL;
    this.getEventData(this.id, url);

  }

  getEventData(id, url) {
    this.dataService.getData(url + "/" + id)
      .subscribe(
        (data) => {
          // this.isLoading = false;
          console.log(data);
          this.eventData = data;
          this.getOrganizorData(this.eventData.org_id);
          this.timeInterval();
          return true;
        },
        err => {
          // this.isLoading = false;
          console.log('errorData', err);
          return true;
        });
  }

  getOrganizorData(id) {
    let url = this.baseService.organizorURL;
    this.dataService.getData(url + "/" + id)
      .subscribe(
        (data) => {
          console.log(data);
          this.organizorData = data;
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
      if (this.progressValue == 1) {
        subscription.unsubscribe();
        this.isTimerOver(this.customerInfo.name);
      }
    });
  }

  isTimerOver(name): void {
    let dialogRef = this.dialog.open(TimeOverComponent, {
      width: '350px',
      data: name
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.router.navigate(['']);
    });
  }

  openLocationDialog(location): void {
    let dialogRef = this.dialog.open(LocationDialogComponent, {
      width: '350px',
      data: { location: location }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  onChange(selectedValue:string) {
    console.log('selectedValue', selectedValue);
    let date = selectedValue.split("T");

    this.s__Date = date[0];
    this.isStep1Table = !!selectedValue;

    console.log(this.isStep1Table, this.s__Date);
  }

  onChangedLocation(value: string){
    this.isStep2Table = !!value;
    console.log(this.eventData);
    let locationData = this.eventData.seat_details.filter((book: any) =>
      book.location === value
    );
    this.locationData = locationData[0];
  }

  getBookingInfo() {
    console.log(this.s__quantity);
    this.bookingInfo = {
      location: this.locationData.location,
      quantity: this.s__quantity,
      price: this.locationData.ticket_price,
      total_price:  this.s__quantity * this.locationData.ticket_price
    }
  }

  getPSE() {
    console.log(this.id_number);
  }

}

@Component({
  templateUrl: 'time-over.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class TimeOverComponent {

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<TimeOverComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      console.log(data);
    }

  ngOnInit() {
    console.log(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}


@Component({
  templateUrl: 'location-dialog.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class LocationDialogComponent {

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public dialogRef: MatDialogRef<LocationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(this.data)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    //set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }
}
