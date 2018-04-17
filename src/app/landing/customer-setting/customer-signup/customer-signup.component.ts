import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { fadeInAnimation } from "../../../route.animation";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BaseService } from "../../../../provide/base-service";
import { Observable } from 'rxjs/Rx';
import { UserService } from '../../../../provide/user-service';


@Component({
  selector: 'ms-customer-signup',
  templateUrl: './customer-signup.component.html',
  styleUrls: ['./customer-signup.component.scss'],
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [fadeInAnimation]
})
export class CustomerSignupComponent implements OnInit {

  userData: any;
  isLoading: boolean = false;
  isUser: boolean = false;

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<CustomerSignupComponent>,
    public userService: UserService,
    public baseService: BaseService
  ) {

  }

  ngOnInit() {

  }

  register() {
    this.isLoading = true;
    this.userService.signup(this.userData)
      .subscribe(
        (data) => {
          this.isLoading = false;
          sessionStorage.setItem('OAuthInfo', JSON.stringify(data));
          this.onNoClick();
          this.router.navigate(['']);
          return true;
        },
        error => {
          this.isLoading = false;
          this.isUser = true;
          return true;
        });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

