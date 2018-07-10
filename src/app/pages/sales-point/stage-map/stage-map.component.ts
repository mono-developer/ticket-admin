import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component'

@Component({
  selector: 'ms-stage-map',
  templateUrl: './stage-map.component.html',
  styleUrls: ['./stage-map.component.scss']
})
export class StageMapComponent implements OnInit {

  items: any = [
    {
      title: 'ALFOMBRA',
      subtitle: 'ROJA VALOR POR PERSONA',
      price: [650, 520],
      location: 'VIP 1',
      vertical: ["A", "B", "C", "D"],
      color: "#ca0404",
      horizontal: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    },
    {
      title: 'PALCO DIAMANTE',
      subtitle: 'VALOR POR PERSONA',
      price: [550, 440],
      location: 'VIP 2',
      vertical: ["A", "B", "C", "D"],
      color: "#4e4eec",
      horizontal: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    },
    {
      title: 'PALACO ORO',
      subtitle: 'VALOR POR PERSONA',
      price: [450, 360],
      location: 'General 1',
      vertical: ["A", "B", "C", "D"],
      color: "#02d202",
      horizontal: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    },
    {
      title: 'PALCO PLATA',
      subtitle: 'VALOR POR PERSONA',
      price: [350, 280],
      location: 'General 2',
      vertical: ["A", "B", "C", "D"],
      color: "#d4d400",
      horizontal: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    }
  ];

  constructor(
    public router: Router,
    public dialog: MatDialog) {
   }

  ngOnInit() {

  }

  openInfo(section, price, v_item, item): void {
    let dialogRef = this.dialog.open(InfoDialogComponent, {
      width: '350px',
      data: {section: section, price: price, v_item: v_item, item: item}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}

