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
  ticketList: any;
  selectedDate: any;
  eventData: any = {};
  table: boolean = false;

  selectedIndex: number = 0;
  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public baseService: BaseService,
    public dataService: DataService
  ) {

        this.ticketList = [
            { id: 0, name: "Ticket1" },
            { id: 1, name: "Thcket2" }
        ];

   }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    let url = this.baseService.eventURL;
    this.getEventData(id, url);
  }

  nextStep() {
    this.selectedIndex += 1;
  }

  previousStep() {
    this.selectedIndex -= 1;
  }

  getEventData(id, url) {

    this.dataService.getData(url + "/" + id)
      .subscribe(
        (data) => {
          // this.isLoading = false;
          console.log(data);
          this.eventData = data;
          return true;
        },
        err => {
          // this.isLoading = false;
          console.log('errorData', err);
          return true;
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
    console.log(selectedValue);
    // this.selectedDate? this.table = true: this.table = false;
    this.table = !!selectedValue;
    console.log(this.table);
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
