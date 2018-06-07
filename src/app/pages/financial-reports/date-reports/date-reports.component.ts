import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'ms-date-reports',
  templateUrl: './date-reports.component.html',
  styleUrls: ['./date-reports.component.scss']
})
export class DateReportsComponent implements OnInit {

  public exportTime = { hour: 7, minute: 30, meriden: 'PM', format: 12 };
  constructor(
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

}
