import { Component, OnInit, Inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CustomerLoginComponent } from '../../customer-setting/customer-login/customer-login.component';
import { CustomerProfilComponent } from '../../customer-setting/customer-profile/customer-profile.component';

@Component({
  selector: 'ms-toolbar-user-button',
  templateUrl: './toolbar-user-button.component.html',
  styleUrls: ['./toolbar-user-button.component.scss']
})
export class ToolbarUserButtonComponent implements OnInit {

  isOpen: boolean;
  userInfo: any;

  constructor(
    public router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  logout() {
    sessionStorage.clear();
    this.isOpen = false;
    this.userInfo = null;
  }

  customerLogin() {
    this.isOpen = false;
    let dialogRef = this.dialog.open(CustomerLoginComponent, {
      width: '350px',
      data: {email: '', password: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.access == '2'){
        this.userInfo = result;
        sessionStorage.setItem('userInfo', JSON.stringify(result));
      }else if(result == 'register'){
        this.router.navigate(['/register']);
      }else if(result == 'forgot'){
        this.router.navigate(['/forgot-password', {page: 'customer'}]);
      }else{
      }
    });
  }

  userProfile() {
    this.isOpen = false;
    let dialogRef = this.dialog.open(CustomerProfilComponent, {
      width: '350px',
      data: this.userInfo
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onClickOutside() {
    this.isOpen = false;
  }

}

