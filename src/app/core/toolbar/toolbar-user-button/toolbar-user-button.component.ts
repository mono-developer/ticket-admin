import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";

@Component({
  selector: 'ms-toolbar-user-button',
  templateUrl: './toolbar-user-button.component.html',
  styleUrls: ['./toolbar-user-button.component.scss']
})
export class ToolbarUserButtonComponent implements OnInit {

  isOpen: boolean;
  userInfo: any;
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  onClickOutside() {
    this.isOpen = false;
  }

  goLandingPage() {
    localStorage.removeItem('userInfo');
    this.router.navigate(['']);
  }

  goProfilePage() {
    this.isOpen = false;
    this.router.navigate(['dashboard/profile']);
  }

}
