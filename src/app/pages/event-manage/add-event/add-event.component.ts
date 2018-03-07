import { Component, OnInit, Inject } from '@angular/core';
import {fadeInAnimation} from "../../../route.animation";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource} from '@angular/material';
import { UploadFileService } from '../../../../provide/upload-file.service';
import { select } from 'd3';
import { Observable } from 'rxjs';

import { BaseService } from "../../../../provide/base-service";
import { DataService } from "../../../../provide/data-service";

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

  eventList: any = [];
  seatList: any = [];
  categoryList: any;
  organizationList: any;
  boxList: any;

  displayedColumns = ['location', 'bill', 'tickets', 'type', 'symbol'];
  displayedColumns2 = ['date', 'symbol'];
  dataSource: any;
  dataSource2: any;

  couponList: any;
  stateList: any;

  printCheck: boolean;
  pickCheck: boolean;
  purchaserCheck: boolean;

  eventImg: any;
  seatImg: any;
  ticketImg: any;

  isLoading: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    public router: Router,
    private uploadService: UploadFileService,
    public baseService: BaseService,
    public dataService: DataService
  ) {
    this.couponList = [
                  { code: 'SAVE100', description: 'New year Offer', discount: '10', state: 'Active', symbol: '' },
                  { code: 'SAVE10', description: 'NEW YEAR OFFER', discount: '12', state: 'Active', symbol: '' }
                ];
    this.stateList = [  { id: 0, name: 'Active', state: true },
                        { id: 1, name: 'Inative', state: false }
                      ];

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
    this.getCategoryData();
    this.getOrgData();
  }

  getCategoryData() {
    let cate_url = this.baseService.categoryURL;
    this.dataService.getData(cate_url)
      .subscribe(
        (data) => {
          console.log('categoryData', data);
          this.categoryList = data;
          this.dataSource = new MatTableDataSource(this.categoryList);
          return true;
        },
        err => {
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
          this.dataSource = new MatTableDataSource(this.organizationList);
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
        this.eventList.push(result);
        this.dataSource2 = new MatTableDataSource(this.eventList);
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
    this.seatList.splice(index, 1);
    this.dataSource = new MatTableDataSource(this.eventList);
  }

  openSeatDialog(): void {

   let modalData: any = {
      location: '',
      bill_price: '',
      tickets_number: '',
      type_charge: '',
      load_amount: '',
      quantity: '',
      discount: '',
      price_pecent: '',
      ok_value: '',
      image: ''
    };

    let dialogRef = this.dialog.open(SeatDatailsDialogComponent, {
      width: '470px',
      data: { modalData: modalData}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == undefined) {
        console.log(result);
      } else {
      this.seatList.push(result);
      this.dataSource = new MatTableDataSource(this.seatList);
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
    this.seatList.splice(index, 1);
    this.dataSource = new MatTableDataSource(this.seatList);
  }

  convertDate(date) {
    let newDate = date.toString();
    return newDate.substr(0, 15)
  }

  //  Step 3

  eventImage(event: any) {
    this.isLoading = true;
    const file = event.target.files[0];
    this.uploadService.uploadfile(file).subscribe((data: any) => {
      this.isLoading = false;
      console.log("aaaaaaa", data);
      this.eventImg = data.Location;
    }, (err) => {
      this.isLoading = false;
      console.log("errror", err);
    });
  }

  seatImage(event: any) {
    this.isLoading = true;
    const file = event.target.files[0];
    this.uploadService.uploadfile(file).subscribe((data: any) => {
      this.isLoading = false;
      console.log("aaaaaaa", data);
      // let data: any = data.Location
      this.seatImg = data.Location;
    }, (err) => {
      this.isLoading = false;
      console.log("errror", err);
    });
  }

  ticketImage(event: any) {
    this.isLoading = true;
    const file = event.target.files[0];
    this.uploadService.uploadfile(file).subscribe((data: any) => {
      this.isLoading = false;
      console.log("aaaaaaa", data);
      this.ticketImg = data.Location;
    }, (err) => {
      this.isLoading = false;
      console.log("errror", err);
    });
  }

  done(){
    console.log('done');
  }

}

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

@Component({
  selector: 'seat-details-dialog',
  templateUrl: './seat-details-dialog.component.html',
  styleUrls: ['./event-dialog.component.scss'],
})
export class SeatDatailsDialogComponent {
  public boxList: any = [ { id: 0, name: "Yes", value: true },
                          { id: 1, name: "No", value: false }
                        ];
  public detail_img: any = false;
  isLoading: boolean;

  constructor(
    private uploadService: UploadFileService,
    public dialogRef2: MatDialogRef<SeatDatailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  onNoClick(): void {
    this.dialogRef2.close();
  }

  fileEvent(event: any) {
    this.isLoading = true;
    const file = event.target.files[0];
    this.uploadService.uploadfile(file).subscribe((data: any) => {
      this.isLoading = false;
      console.log("aaaaaaa", data);
      this.data.modalData.image = data.Location;
    }, (err) => {
      this.isLoading = false;
      console.log("errror", err);
    });
  }




}


