import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MatDialogRef, MatDialog } from "@angular/material";
import { fadeInAnimation } from "../../../route.animation";
import { BaseService } from "../../../../provide/base-service";
import { UserService } from "../../../../provide/user-service";
import { Observable } from 'rxjs/Rx';

import * as _ from 'lodash';


@Component({
  selector: 'ms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [ fadeInAnimation ]
})
export class LoginComponent implements OnInit {
  dialogRef: MatDialogRef<LoginErrorDialog>;
  userData: any = { email: '', password: '' };
  isLoading: boolean = false;
  isRemember: boolean = false;

  constructor(
    private router: Router,
    public baseService: BaseService,
    public userService: UserService,
    public dialog: MatDialog,
  ) {  }

  ngOnInit() {
    sessionStorage.removeItem('userInfo');
    let userData = sessionStorage.getItem('UserData');
    if(userData){
      this.userData = JSON.parse(userData);
    }else{
      sessionStorage.removeItem('UserData');
      this.userData = { email: '', password: '' };
    }
  }

  changedRemember() {
    console.log(this.isRemember);
  }

  login() {
    this.isLoading = true;
    this.userService.login(this.userData)
      .subscribe(
        (data) => {
          this.isLoading = false;
          console.log('DataLogin',data);
          if (this.isRemember == true) {
            sessionStorage.setItem('UserData', JSON.stringify(this.userData));
          } else {
            sessionStorage.removeItem('UserData');
          }
          if(data.user.status){
            sessionStorage.setItem('token', JSON.stringify(data.token));
            sessionStorage.setItem('userInfo', JSON.stringify(data.user));
            this.router.navigate(['/dashboard']);
          }else{
            this.accessError();
          }
          return true;
        },
        err => {
          this.isLoading = false;
          console.log('errorData', err);
          this.openPasswordError();
          return true;
        });
  }

  accessError() {
    this.dialogRef = this.dialog.open(AccessErrorDialog, {
      disableClose: false
    });
    this.dialogRef.afterClosed();
  }

  openPasswordError() {
    this.dialogRef = this.dialog.open(LoginErrorDialog, {
      disableClose: false
    });
    this.dialogRef.afterClosed();
  }

}

@Component({
  selector: 'ms-loginerror-dialog',
  template: `
  <h2>The login credentials are incorrect</h2>
  <mat-dialog-actions align="end">
    <button mat-button (click)="dialogRef.close()">OK</button>
  </mat-dialog-actions>
  `
})
export class LoginErrorDialog {
  constructor(public dialogRef: MatDialogRef<LoginErrorDialog>) { }
}

@Component({
  selector: 'ms-accesserror-dialog',
  template: `
  <h2>You have no access</h2>
  <mat-dialog-actions align="end">
    <button mat-button (click)="dialogRef.close()">OK</button>
  </mat-dialog-actions>
  `
})
export class AccessErrorDialog {
  constructor(public dialogRef: MatDialogRef<AccessErrorDialog>) { }
}
