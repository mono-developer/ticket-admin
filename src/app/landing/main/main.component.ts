import { Component, OnInit, AfterViewInit, Inject} from '@angular/core';
import {fadeInAnimation} from "../../route.animation";
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BaseService } from "../../../provide/base-service";
import { DataService } from "../../../provide/data-service";
import { BookingDialogComponent } from '../booking-dialog/booking-dialog.component';

@Component({
    selector: 'ms-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    host: {
        '[@fadeInAnimation]': 'true'
    },
    animations: [ fadeInAnimation ]
})
export class MainComponent implements OnInit, AfterViewInit {

    userInfo: any;
    categoryData: any = [];
    categoryList: any = [];
    config: any;
    config1: any;
    eventList: any;
    bannerList: any;
    colorList: any;
    isLoading: boolean = false;
    username: string;
    useremail: string;

    venueData: any;

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        public dialog: MatDialog,
        public baseService: BaseService,
        public dataService: DataService
    ) {

        let that = this;

        that.config = {
          slidesPerView: 2,
          spaceBetween: 30,
          centeredSlides: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
        }

        that.config1 = {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            },
            pagination: {
                el: '.swiper-pagination',
            },
        };
      this.venueData = { title: '', email: '', description: '' };
      this.colorList = ['lightgreen', 'cornflowerblue', 'skyblue', 'fuchsia', 'chartreuse', 'cyan', 'chartreuse', 'skyblue', 'lightgreen' ]
    }

    ngAfterViewInit() {
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 1000);
    }

    ngOnInit() {
        this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        console.log('mainUserInfo', this.userInfo);
        this.getEventList();
        this.getCategoryList();
        this.getBanner();
    }

    getEventList() {
        this.isLoading = true;
        this.dataService.getNoTokenData(this.baseService.eventURL)
        .subscribe(
            (data) => {
                this.isLoading = false;
                this.eventList = data;
                this.eventDateArray(data);
                console.log('eventList', data);
                return true;
            },
            err => {
                this.isLoading = false;
                console.log('errorData', err);
                return true;
            });
    }

    eventDateArray(data) {
      let todays = [];
      let tomorrows = [];
      let thisWeeks = [];
      let thisMonths = [];

      let today = new Date().setHours(0, 0, 0, 0);
      let monday;
      let sunday;

      data.map((item) => {

        let startDate = new Date(item.s_date).setHours(0, 0, 0, 0);
        let endDate = new Date(item.e_date).setHours(0, 0, 0, 0);

        if( startDate == today || endDate == today) {
          todays.push(item);
        }

        if( (startDate >= monday || startDate <= sunday) && (endDate >= monday || endDate <=sunday)) {

        }


      });
      // const today = new Date();
      // let todayDate = today.setHours(0, 0, 0, 0);

      // let newGetDate = this.eventList[2].event_date[1].date;
      // let newDate = new Date(newGetDate).setHours(0, 0, 0, 0);

      // if(todayDate === newDate){
      //   console.log('same', todayDate);
      // }

    }

  getMonday(d) {
    d = new Date(d);
    var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }


    getCategoryList() {
      this.dataService.getNoTokenData(this.baseService.categoryURL)
          .subscribe(
              (data) => {
                  this.categoryList = data;
                  console.log('categoryList', data);
                  return true;
              },
              err => {
                  console.log('errorData', err);
                  return true;
              });
    }

  getBanner() {
    this.dataService.getNoTokenData(this.baseService.bannerURL)
      .subscribe(
        (data) => {
          this.bannerList = data;
          console.log('bannerList', data);
          return true;
        },
        err => {
          console.log('errorData', err);
          return true;
        });
  }


    openBookingDialog(eventData): void {
        let dialogRef = this.dialog.open(BookingDialogComponent, {
        width: '350px',
        data: { name: eventData.event_name, username: this.username, userEmail: this.useremail }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            let customerData = { name: result.username, email: result.userEmail }
            if(result){
              this.router.navigate(['booking', { id: eventData._id, customName: result.username, customEmail: result.userEmail }]);
            }
        });
    }

    openDescriptionDialog(data): void {
      console.log(data._id);

      this.router.navigate(['booking1', { id: data._id}]);
        // console.log('Description');
        // let dialogRef = this.dialog.open(DescriptionDialogComponent, {
        //     width: '400px',
        //     data: data
        // });

        // dialogRef.afterClosed().subscribe(result => {
        //     console.log(result);
        // });

    }

    leaveFeedback() {
      let url = this.baseService.newsLetterURL;
      console.log(this.venueData);
      this.isLoading = true;
      this.dataService.postNoTokenData(url, this.venueData)
        .subscribe(
          (data) => {
            this.isLoading = false;
            console.log('', data);
            location.reload();
            return true;
          },
          error => {
            this.isLoading = false;
            console.log('errorData', error);
            return true;
          }
        )
    }
 }

