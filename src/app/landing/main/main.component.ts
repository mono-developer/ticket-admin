import { Component, OnInit, AfterViewInit, Inject} from '@angular/core';
import {fadeInAnimation} from "../../route.animation";

import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BaseService } from "../../../provide/base-service";
import { DataService } from "../../../provide/data-service";


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
    colorList: any;
    isLoading: boolean = false;
    username: string;
    useremail: string;

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
      let today = new Date().getTime();
      let sampleDate = new Date(data[0].e_date).getTime();
      console.log('today', today, sampleDate);
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
}

//Booking Dialog
@Component({
    templateUrl: 'booking-dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
})
export class BookingDialogComponent {


constructor(
    public dialogRef: MatDialogRef<BookingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(this.data);
    }

onNoClick(): void {
        this.dialogRef.close();
    }
}

// Description Dialog

@Component({
    templateUrl: 'description-dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
})
export class DescriptionDialogComponent {

constructor(
    public dialogRef: MatDialogRef<DescriptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
        console.log(this.data)
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
