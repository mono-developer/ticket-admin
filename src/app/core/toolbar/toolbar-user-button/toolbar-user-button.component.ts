import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";

@Component({
  selector: 'ms-toolbar-user-button',
  templateUrl: './toolbar-user-button.component.html',
  styleUrls: ['./toolbar-user-button.component.scss']
})
export class ToolbarUserButtonComponent implements OnInit {

  isOpen: boolean;
  name: string;
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    let oAuthRawInfo = JSON.parse(sessionStorage.getItem('OAuthInfo'));
    this.name = oAuthRawInfo.user.name;
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  onClickOutside() {
    this.isOpen = false;
  }

  goLandingPage() {
    console.log(' go LandingPage');
    sessionStorage.removeItem('OAuthInfo');
    this.router.navigate(['']);
  }

}
