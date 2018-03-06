import { Component, OnInit, Inject } from '@angular/core';
import {fadeInAnimation} from "../../../route.animation";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource} from '@angular/material';
import { UploadFileService } from '../../../../provide/upload-file.service';
import { select } from 'd3';
import { Observable } from 'rxjs';

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
  purchaserCheck: boolean

  constructor(
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
  ) {
    this.categoryList = [ { id: 0, name: 'Music'},
                          { id: 1, name: 'Sports'},
                          { id: 2, name: 'Theater'},
                          { id: 3, name: 'Concerts'},
                          { id: 4, name: 'Family'},
                          { id: 5, name: 'Others'}
                    ];
    this.organizationList = [ { id: 0, name: "Organization1"},
                              { id: 1, name: "Organization2"},
                              { id: 2, name: "Organization3"},
                              { id: 3, name: "Organization4"},
                              { id: 4, name: "Organization5"},
                    ];
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
    const file = event.target.files[0];
    console.log(file);
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
  public detail_img: any;

  constructor(
    private uploadService: UploadFileService,
    public dialogRef2: MatDialogRef<SeatDatailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  onNoClick(): void {
    this.dialogRef2.close();
  }

  fileEvent(event: any) {
    const file = event.target.files[0];
    this.uploadService.uploadfile(file);
  }
  // fileEvent(event: any) {
  //   const file = event.target.files[0];
  //   this.uploadService.uploadfile(file).subscribe(data =>{
  //     console.log("aaaaaaa",data);
  //   },(err)=> {
  //     console.log("errror", err);
  //   });
  // }



}


