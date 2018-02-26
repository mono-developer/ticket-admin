import { Component, OnInit, Inject } from '@angular/core';
import {fadeInAnimation} from "../../../route.animation";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

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

  categoryList: any;
  organizationList: any;
  boxList: any;

  // data: any = {};
  modalData: any = { animal: '' };
  name: string;
  // animal: string;

  constructor(
    private _formBuilder: FormBuilder,
    public dialog: MatDialog
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
    this.boxList = [ { id: 0, name: "Do not"},
                     { id: 1, name: "And it is"}
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

  openDialog(): void {
    let dialogRef = this.dialog.open(AddEventDialogComponent, {
      width: '450px',
      data: { name: this.name, modalData: this.modalData }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.modalData = result;
    });
  }

}


@Component({
  selector: 'add-event-dialog',
  templateUrl: './add-event-dialog.component.html',
})
export class AddEventDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AddEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
