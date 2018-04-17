import { Component, OnInit, Inject} from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { fadeInAnimation } from "../../../route.animation";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BaseService } from "../../../../provide/base-service";
import { Observable } from 'rxjs/Rx';
import { UserService } from '../../../../provide/user-service';

@Component({
  selector: 'ms-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.scss'],
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [fadeInAnimation]
})
export class CustomerLoginComponent implements OnInit {

  userInfo: any;

  isLoading: boolean = false;
  errorAccess: boolean = false;
  errorPassword: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<CustomerLoginComponent>,
    public userService: UserService,
    public baseService: BaseService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // this.userData = { email: '', password: ''}
    console.log(this.data);
  }

  ngOnInit() {

  }

  login() {
    console.log(this.data);
    this.isLoading = true;
    this.userService.login(this.data)
      .subscribe(
        (data) => {
          this.isLoading = false;
          console.log('DataLogin', data);
          if (data.user.access == '2') {
            // sessionStorage.setItem('userInfo', JSON.stringify(data.user));
            this.userInfo = data.user;
            this.dialogRef.close(this.userInfo);
          } else {
            this.errorAccess = true;
            setTimeout(() => {
              this.errorAccess = false;
            }, 5000);
          }
          return true;
        },
        err => {
          this.isLoading = false;
          console.log('errorData', err);
          this.errorPassword = true;
          setTimeout(() => {
            this.errorPassword = false;
          }, 3000);
          return true;
        });

  }

  register() {
    console.log('register');
    this.data = 'register';
    this.dialogRef.close();
  }

  forgotPws() {
    console.log('forgot password');
    this.data = 'forgot';
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

