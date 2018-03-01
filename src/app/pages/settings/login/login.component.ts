import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { fadeInAnimation } from "../../../route.animation";
import { UserService } from "../../../../provide/user-service";
import { Observable } from 'rxjs/Rx';
// import { LoadingOverlayComponent } from '../../../core/loading-overlay/loading-overlay.component';

import * as _ from 'lodash';
import { MatDialogRef, MatDialog } from "@angular/material";


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
  result: string;
  userData: any = { email: '', password: '' };
  isLoading: boolean = false;

  constructor(
    private router: Router,
    public userService: UserService,
    public dialog: MatDialog,
    // public isLoading: LoadingOverlayComponent
  ) { }

  ngOnInit() {
    sessionStorage.removeItem('OAuthInfo');
  }

  login() {
    this.isLoading = true;
    this.userService.login(this.userData)
      .subscribe(
        (data) => {
          this.isLoading = false;
        console.log('DataLogin',data);
        sessionStorage.setItem('OAuthInfo', JSON.stringify(data));
        this.router.navigate(['/']);
        return true;
      },
      err => {
        this.isLoading = false;
        console.log('errorData', err);
        this.openDialog();
        return true;
      });
  }

  openDialog() {
    this.dialogRef = this.dialog.open(LoginErrorDialog, {
      disableClose: false
    });

    this.dialogRef.afterClosed()
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
