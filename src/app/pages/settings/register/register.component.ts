import { Component, OnInit } from '@angular/core';
import {fadeInAnimation} from "../../../route.animation";
import { Router } from "@angular/router";
import { MatDialogRef, MatDialog } from "@angular/material";
import { BaseService } from "../../../../provide/base-service";
import { UserService } from "../../../../provide/user-service";
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'ms-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [ fadeInAnimation ]
})
export class RegisterComponent implements OnInit {

  dialogRef1: MatDialogRef<SignupErrorDialog>;
  dialogRef2: MatDialogRef<PasswordErrorDialog>;
  isLoading: boolean = false;
  resData:any = { name: '', email: '', password:'', phone: '', city: '' }
  passwordConfirm: string;
  constructor(
    private router: Router,
    public baseService: BaseService,
    public userService: UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  register() {
    if(this.resData.password != this.passwordConfirm){
      this.dialogRef2 = this.dialog.open(PasswordErrorDialog, {
        disableClose: false
      });
      this.dialogRef2.afterClosed()
    }else{
      this.signup();
    }
  }

  signup() {
    this.isLoading = true;
    this.userService.signup(this.resData)
      .subscribe(
        (data) => {
          this.isLoading = false;
          sessionStorage.setItem('OAuthInfo', JSON.stringify(data));
          this.router.navigate(['/']);
          return true;
        },
        error => {
          this.isLoading = false;
          this.openDialog();
          return true;
        });
  }

  openDialog() {
    this.dialogRef1 = this.dialog.open(SignupErrorDialog, {
      disableClose: false
    });
    this.dialogRef1.afterClosed()
  }
}

// Comfirm Password Error Dialog
@Component({
  selector: 'ms-signuperror-dialog',
  template: `
  <h2>User already exists</h2>
  <mat-dialog-actions align="end">
    <button mat-button (click)="dialogRef1.close()">OK</button>
  </mat-dialog-actions>
  `
})
export class SignupErrorDialog {
  constructor(public dialogRef1: MatDialogRef<SignupErrorDialog>) { }
}

// Signup Error Dialog
@Component({
  selector: 'ms-passworderror-dialog',
  template: `
  <h2>The comfirmation password must be the same</h2>
  <mat-dialog-actions align="end">
    <button mat-button (click)="dialogRef2.close()">OK</button>
  </mat-dialog-actions>
  `
})
export class PasswordErrorDialog {
  constructor(public dialogRef2: MatDialogRef<PasswordErrorDialog>) { }
}
