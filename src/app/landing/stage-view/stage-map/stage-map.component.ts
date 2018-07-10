import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component'

@Component({
  selector: 'ms-stage-map',
  templateUrl: './stage-map.component.html',
  styleUrls: ['./stage-map.component.scss']
})
export class StageMapComponent implements OnInit {
  @Output() clickedItem = new EventEmitter<any>();

  items: any = [
    {
      title: 'ALFOMBRA',
      subtitle: 'ROJA VALOR POR PERSONA',
      price: [650, 520],
      location: 'VIP 1',
      vertical: ["A", "B", "C", "D"],
      color: "#ca0404",
      selectedItems: [[], [], [], []],
      horizontal: [
        { value: 1, active: true },
        { value: 1, active: true },
        { value: 2, active: true },
        { value: 3, active: true },
        { value: 4, active: true },
        { value: 5, active: true },
        { value: 6, active: true },
        { value: 6, active: true },
        { value: 7, active: true },
        { value: 8, active: true },
        { value: 9, active: true },
        { value: 10, active: true },
        { value: 11, active: true },
        { value: 12, active: true },
        { value: 13, active: true },
        { value: 14, active: true },
        { value: 15, active: true }
      ]
    },
    {
      title: 'PALCO DIAMANTE',
      subtitle: 'VALOR POR PERSONA',
      price: [550, 440],
      location: 'VIP 2',
      vertical: ["A", "B", "C", "D"],
      color: "#4e4eec",
      selectedItems: [[], [], [], []],
      horizontal: [
        { value: 1, active: true },
        { value: 1, active: true },
        { value: 2, active: true },
        { value: 3, active: true },
        { value: 4, active: true },
        { value: 5, active: true },
        { value: 6, active: true },
        { value: 6, active: true },
        { value: 7, active: true },
        { value: 8, active: true },
        { value: 9, active: true },
        { value: 10, active: true },
        { value: 11, active: true },
        { value: 12, active: true },
        { value: 13, active: true },
        { value: 14, active: true },
        { value: 15, active: true }
      ]
    },
    {
      title: 'PALACO ORO',
      subtitle: 'VALOR POR PERSONA',
      price: [450, 360],
      location: 'General 1',
      vertical: ["A", "B", "C", "D"],
      color: "#02d202",
      selectedItems: [[], [], [], []],
      horizontal: [
        { value: 1, active: true },
        { value: 1, active: true },
        { value: 2, active: true },
        { value: 3, active: true },
        { value: 4, active: true },
        { value: 5, active: true },
        { value: 6, active: true },
        { value: 6, active: true },
        { value: 7, active: true },
        { value: 8, active: true },
        { value: 9, active: true },
        { value: 10, active: true },
        { value: 11, active: true },
        { value: 12, active: true },
        { value: 13, active: true },
        { value: 14, active: true },
        { value: 15, active: true }
      ]
    },
    {
      title: 'PALCO PLATA',
      subtitle: 'VALOR POR PERSONA',
      price: [350, 280],
      location: 'General 2',
      vertical: ["A", "B", "C", "D"],
      color: "#d4d400",
      selectedItems: [[], [], [], []],
      horizontal: [
        { value: 1, active: true },
        { value: 1, active: true },
        { value: 2, active: true },
        { value: 3, active: true },
        { value: 4, active: true },
        { value: 5, active: true },
        { value: 6, active: true },
        { value: 6, active: true },
        { value: 7, active: true },
        { value: 8, active: true },
        { value: 9, active: true },
        { value: 10, active: true },
        { value: 11, active: true },
        { value: 12, active: true },
        { value: 13, active: true },
        { value: 14, active: true },
        { value: 15, active: true }
      ]
    }
  ];

  constructor(
    public router: Router,
    public dialog: MatDialog) {
   }

  ngOnInit() {

  }

  openInfo(section, price, v_item, item, jj, kk): void {
    console.log('item', item);
    let dialogRef = this.dialog.open(InfoDialogComponent, {
      width: '350px',
      data: {section: section, price: price, v_item: v_item, item: item.value}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == undefined){
        console.log('cancel');
      }else{
        console.log("ddddddd", section.selectedItems[jj]);
        this.clickedItem.emit(result);
        section.selectedItems[jj].push(kk);
      }
    });
  }

  getActiveState(ii, jj, kk) {
    const index = this.items[ii].selectedItems[jj].indexOf(kk);
    return index > -1;

  }

}

