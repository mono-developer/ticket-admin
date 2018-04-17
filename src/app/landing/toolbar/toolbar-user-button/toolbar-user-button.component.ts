import { Component, OnInit, Inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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
    console.log('userInfo', this.userInfo);
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  logout() {
    sessionStorage.clear();
    this.onClickOutside();
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  customerLogin() {
    console.log('customer Login');
  }

  onClickOutside() {
    this.isOpen = false;
  }

}

