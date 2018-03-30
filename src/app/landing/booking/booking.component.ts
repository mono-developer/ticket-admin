import { Component, OnInit, AfterViewInit, Inject, NgZone, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { BaseService } from "../../../provide/base-service";
import { DataService } from "../../../provide/data-service";

@Component({
  selector: 'ms-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {

  isLinear: boolean = false;
  s__Date: any;
  s__Location: any;
  s__quantity: number = 0;
  s__ballot: any ;
  eventData: any = {};
  isStep1Table: boolean = false;
  isStep2Table: boolean = false;
  locationData: any;
  ballotList: any;
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
    ]
   }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    let url = this.baseService.eventURL;
    this.getEventData(id, url);
  }

  getEventData(id, url) {
    this.dataService.getData(url + "/" + id)
      .subscribe(
        (data) => {
          // this.isLoading = false;
          console.log(data);
          this.eventData = data;
          this.getOrganizorData();
          return true;
        },
        err => {
          // this.isLoading = false;
          console.log('errorData', err);
          return true;
        });
  }

  getOrganizorData() {

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
    console.log(selectedValue);
    let date = selectedValue.split("T");
    let time = selectedValue.split("Z");

    this.s__Date = time[1] + ' ' + date[0];
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
