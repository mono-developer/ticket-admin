import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { SidenavItem } from './sidenav-item/sidenav-item.model';
import { SidenavService } from "./sidenav.service";
import * as _ from 'lodash';
import { Router, NavigationEnd } from "@angular/router";
import { Subscription } from "rxjs";
import { BreadcrumbService } from "../breadcrumb/breadcrumb.service";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material";

@Component({
  selector: 'ms-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidenavComponent implements OnInit, OnDestroy {

  items: SidenavItem[];

  private _itemsSubscription: Subscription;
  private _routerEventsSubscription: Subscription;

  constructor(
    private sidenavService: SidenavService,
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this._itemsSubscription = this.sidenavService.items$
      .subscribe((items: SidenavItem[]) => {
        this.items = this.sortRecursive(items, 'position');
        console.log('items', this.items);
      });

    this._routerEventsSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.sidenavService.nextCurrentlyOpenByRoute(event.url);
        setTimeout(() => {
          window.dispatchEvent(new Event('resize'));
        }, 400);
      }
    });

    this.breadcrumbService.addFriendlyNameForRoute('/', "Dashboard");
    this.breadcrumbService.addFriendlyNameForRoute('/content-manage/view-cms', "View Pages");
    this.breadcrumbService.addFriendlyNameForRoute('/content-manage/add-cms', "Add Pages");
    this.breadcrumbService.addFriendlyNameForRoute('/saleTeam-manage/view-sale-users', "View sales team users");
    this.breadcrumbService.addFriendlyNameForRoute('/saleTeam-manage/Add-sale-users', "Add sales team users");
    this.breadcrumbService.addFriendlyNameForRoute('/event-categories/view-category', "View Category");
    this.breadcrumbService.addFriendlyNameForRoute('/event-categories/add-category', "Add Category");
    this.breadcrumbService.addFriendlyNameForRoute('/users-manage', "User Management");
    this.breadcrumbService.addFriendlyNameForRoute('/event-manage/view-event', "View Events");
    this.breadcrumbService.addFriendlyNameForRoute('/event-manage/add-event', "Add Events");
    this.breadcrumbService.addFriendlyNameForRoute('/orgnization-manage/view-organization', "View Orgnizations");
    this.breadcrumbService.addFriendlyNameForRoute('/orgnization-manage/add-organization', "Add Orgnization");
    this.breadcrumbService.addFriendlyNameForRoute('/reports/general-reports', "Gereral Reports");
    this.breadcrumbService.addFriendlyNameForRoute('/reports/date-reports', "Date of Reports");
    this.breadcrumbService.addFriendlyNameForRoute('/coupon-manage/view-coupon', "View Coupons");
    this.breadcrumbService.addFriendlyNameForRoute('/coupon-manage/add-coupon', "Add Coupon");
    this.breadcrumbService.addFriendlyNameForRoute('//bullentin/view-bullentin', "View Bullentins");
    this.breadcrumbService.addFriendlyNameForRoute('//bullentin/add-bullentin', "Add Bullentin");
    this.breadcrumbService.addFriendlyNameForRoute('/banner-images', "Banner Images");

  }

  toggleIconSidenav() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);

    this.sidenavService.isIconSidenav = !this.sidenavService.isIconSidenav;

    let snackBarConfig: MatSnackBarConfig = <MatSnackBarConfig>{
      duration: 10000
    };

    if (this.sidenavService.isIconSidenav) {
      this.snackBar.open('You activated Icon-Sidenav, move your mouse to the content and see what happens!', '', snackBarConfig);
    }
  }

  isIconSidenav(): boolean {
    return this.sidenavService.isIconSidenav;
  }

  sortRecursive(array: SidenavItem[], propertyName: string) {
    let that = this;

    array.forEach(function (item) {
      let keys = _.keys(item);
      keys.forEach(function(key){
        if(_.isArray(item[key])){
          item[key] = that.sortRecursive(item[key], propertyName);
        }
      });
    });

    return _.sortBy(array, propertyName);
  };

  ngOnDestroy() {
    this._itemsSubscription.unsubscribe();
    this._routerEventsSubscription.unsubscribe();
  }
}
