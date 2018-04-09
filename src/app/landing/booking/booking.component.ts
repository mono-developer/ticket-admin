import { Component, OnInit, AfterViewInit, Inject, NgZone, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { BaseService } from "../../../provide/base-service";
import { DataService } from "../../../provide/data-service";
import { Observable } from 'rxjs/Rx';

import { AgmCoreModule } from '@agm/core';
import { MouseEvent } from '@agm/core';


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
      if (this.progressValue == 100) {
        subscription.unsubscribe();
        // this.isTimerOver(this.customerInfo.name);
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

  // google maps zoom level
  zoom: number = 15;
  lat: number = 51.673858;
  lng: number = 7.815982;
  marker: any;

  styles = [
    {
      "featureType": "water",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "simplified"
        },
        {
          "invert_lightness": false
        },
        {
          "color": "#004963"
        },
        {
          "weight": 8
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "invert_lightness": false
        },
        {
          "color": "#b7ebeb"
        },
        {
          "saturation": -53
        },
        {
          "lightness": 2
        }
      ]
    },
    {
      "featureType": "landscape.man_made",
      "elementType": "geometry",
      "stylers": [
        {
          "visibility": "on"
        },
        {
          "invert_lightness": false
        },
        {
          "hue": "#767878"
        },
        {
          "saturation": -93
        },
        {
          "lightness": 56
        }
      ]
    },
    {
      "featureType": "landscape.man_made",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "visibility": "on"
        },
        {
          "color": "#b8dbe0"
        },
        {
          "saturation": -7
        },
        {
          "lightness": 33
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "simplified"
        },
        {
          "saturation": -1
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#d1e6d7"
        }
      ]
    },
    {
      "featureType": "poi.sports_complex",
      "elementType": "all",
      "stylers": [
        {
          "saturation": -100
        },
        {
          "lightness": 61
        }
      ]
    },
    {
      "featureType": "poi.school",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "off"
        },
        {
          "saturation": -100
        },
        {
          "lightness": 80
        }
      ]
    },
    {
      "featureType": "poi.place_of_worship",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.business",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "simplified"
        },
        {
          "color": "#d74340"
        },
        {
          "saturation": -32
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit.station.rail",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d74340"
        }
      ]
    },
    {
      "featureType": "transit.station.rail",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "simplified"
        },
        {
          "lightness": 0
        },
        {
          "gamma": 2.05
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "lightness": 100
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "saturation": -100
        },
        {
          "lightness": 78
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "visibility": "on"
        },
        {
          "color": "#000000"
        },
        {
          "lightness": 40
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "saturation": -100
        },
        {
          "lightness": 54
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "visibility": "on"
        },
        {
          "saturation": -100
        },
        {
          "lightness": 28
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    }
  ];

  constructor(
    private ngZone: NgZone,
    public dialogRef: MatDialogRef<LocationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(this.data)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.marker =
      {
        lat: 51.673858,
        lng: 7.815982,
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





