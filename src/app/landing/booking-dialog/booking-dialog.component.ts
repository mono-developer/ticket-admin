import { Component, OnInit, Inject } from '@angular/core';
import { fadeInAnimation } from "../../route.animation";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
  selector: 'ms-booking-dialog',
  templateUrl: './booking-dialog.component.html',
  styleUrls: ['./booking-dialog.component.scss'],
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [fadeInAnimation]
})
export class BookingDialogComponent implements OnInit {

  isLoading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<BookingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(this.data);
  }

  ngOnInit() { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

