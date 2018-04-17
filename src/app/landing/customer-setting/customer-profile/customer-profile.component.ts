import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { fadeInAnimation } from "../../../route.animation";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BaseService } from "../../../../provide/base-service";
import { Observable } from 'rxjs/Rx';
import { UserService } from '../../../../provide/user-service';


@Component({
  selector: 'ms-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.scss'],
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [fadeInAnimation]
})
export class CustomerProfilComponent implements OnInit {


  isLoading: boolean = false;

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<CustomerProfilComponent>,
    public userService: UserService,
    public baseService: BaseService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(this.data);
  }

  ngOnInit() {

  }

  addPhoto() {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

