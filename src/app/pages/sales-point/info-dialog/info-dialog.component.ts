import { Component, OnInit, Inject } from '@angular/core';
import { fadeInAnimation } from "../../../route.animation";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
  selector: 'ms-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss'],
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [fadeInAnimation]
})
export class InfoDialogComponent implements OnInit {

  title: string;
  subtitle: string;
  price: any;
  position: string;

  constructor(
    public dialogRef: MatDialogRef<InfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit() {
    console.log(this.data);
    this.title = this.data.section.title;
    this.subtitle = this.data.section.subtitle;
    this.price = this.data.section.price;
    this.position = '(' + this.data.v_item + '-' + this.data.item + ')';

   }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

