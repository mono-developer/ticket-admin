import { Component, OnInit, AfterViewInit, Inject, NgZone, ElementRef, ViewChild  } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { fadeInAnimation } from "../../route.animation";

import { BaseService } from "../../../provide/base-service";
import { DataService } from "../../../provide/data-service";

import { AgmCoreModule } from '@agm/core';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { MouseEvent } from '@agm/core';
import { select } from 'd3';

@Component({
  selector: 'ms-booking1',
  templateUrl: './booking1.component.html',
  styleUrls: ['./booking1.component.scss'],
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [fadeInAnimation]
})
export class Booking1Component implements OnInit {

  id: string;
  // url: string;
  eventData: any;
  orgData: any;
  dateInfo: any;
  ticketInfo: any;
  isLoading: boolean = false;

  // google map

  zoom: number = 15;
  lat: number;
  lng: number;
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
    private router: Router,
    public route: ActivatedRoute,
    public baseService: BaseService,
    public dataService: DataService,
    private ngZone: NgZone,
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    let url = this.baseService.eventURL;
    console.log(this.id, url);

    this.getEventData(this.id, url);
  }

  getEventData(id, url) {
    this.isLoading = true;
    this.dataService.getNoTokenData(url + "/" + id)
      .subscribe(
        (data) => {
          this.isLoading = false;
          console.log(data);
          this.eventData = data;
          this.orgData = data.organization;
          this.dateInfo = data.event_date;
          this.ticketInfo = data.ticket_data;

          this.lat = Number(data.latitude);
          this.lng = Number(data.longitude);

          this.marker = { lat: this.lat, lng: this.lng, label: data.place, draggable: true }

          return true;
        },
        err => {
          this.isLoading = false;
          console.log('errorData', err);
          return true;
        });
  }

  clickedMarker() {
    console.log('clicked the marker:', this.marker.label)
  }
}
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
