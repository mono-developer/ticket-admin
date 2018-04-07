import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'ms-date-reports',
  templateUrl: './date-reports.component.html',
  styleUrls: ['./date-reports.component.scss']
})
export class DateReportsComponent implements OnInit {

  public exportTime = { hour: 7, minute: 30, meriden: 'PM', format: 12 };

  // public exportTime24 = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
  constructor(
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  // onRevert() {
  //   this.exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 12 };
  //   this.exportTime24 = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
  //   this.snackBar.open(`Revert time to ${this.exportTime.hour}:${this.exportTime.minute} ${this.exportTime.meriden}`, null, {
  //     duration: 500,
  //   });
  // }

  // onSubmit(time) {
  //   this.snackBar.open(`Saved time ${this.exportTime.hour}:${this.exportTime.minute} ${this.exportTime.meriden}`, null, {
  //     duration: 500,
  //   });
  // }

}
