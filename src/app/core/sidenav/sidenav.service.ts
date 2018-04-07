import { Injectable } from '@angular/core';
import { SidenavItem } from "./sidenav-item/sidenav-item.model";
import { BehaviorSubject, Observable } from "rxjs";
import * as _ from 'lodash';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material";

@Injectable()
export class SidenavService {

  private _itemsSubject: BehaviorSubject<SidenavItem[]> = new BehaviorSubject<SidenavItem[]>([]);
  private _items: SidenavItem[] = [ ];
  items$: Observable<SidenavItem[]> = this._itemsSubject.asObservable();

  private _currentlyOpenSubject: BehaviorSubject<SidenavItem[]> = new BehaviorSubject<SidenavItem[]>([]);
  private _currentlyOpen: SidenavItem[] = [ ];
  currentlyOpen$: Observable<SidenavItem[]> = this._currentlyOpenSubject.asObservable();

  isIconSidenav: boolean;

  name: string;

  constructor(
    snackbar: MatSnackBar
  ) {
    let menu = this;

    let dashboard = menu.addItem('Dashboard', 'dashboard', '/dashboard', 1, true);

    let content_manage = menu.addItem('Content Management', 'content_copy', null, 2, true);
    menu.addSubItem(content_manage, 'View Pages', '/dashboard/content-manage/view-cms', 1);
    menu.addSubItem(content_manage, 'Add Page', '/dashboard/content-manage/add-cms', 2);

    let team_manage = menu.addItem('Point of Sales', 'group', null, 3, true);
    menu.addSubItem(team_manage, 'View sales user', '/dashboard/sales-point/view-sale-users', 1);
    menu.addSubItem(team_manage, 'Add sales user', '/dashboard/sales-point/add-sale-users', 2);

    let event_category = menu.addItem('Event Categories', 'event_note', null, 4, true);
    menu.addSubItem(event_category, 'View Categories', '/dashboard/event-categories/view-category', 1);
    menu.addSubItem(event_category, 'Add Category', '/dashboard/event-categories/add-category', 2);

    let event_manage = menu.addItem('Event Management', 'map', null, 5, true);
    menu.addSubItem(event_manage, 'View Events', '/dashboard/event-manage/view-event', 1);
    menu.addSubItem(event_manage, 'Add Event', '/dashboard/event-manage/add-event', 2);

    let user_manage = menu.addItem('User Management', 'person', '/dashboard/users-manage', 6, true);

    let organizor_manage = menu.addItem('Event Organizer', 'group_add', null, 7, true);
    menu.addSubItem(organizor_manage, 'View Organizer', '/dashboard/organizor-manage/view-organizor', 1);
    menu.addSubItem(organizor_manage, 'Add Organizer', '/dashboard/organizor-manage/add-organizor', 2);

    let reports = menu.addItem('Financial Reports', 'report', null, 8, true);
    menu.addSubItem(reports, 'Gereral Reports ', '/dashboard/financial-reports/general-reports', 1);
    menu.addSubItem(reports, 'Date of Reports', '/dashboard/financial-reports/date-reports', 2);

    let coupon_manage = menu.addItem('Coupon Management', 'credit_card', null, 9, true);
    menu.addSubItem(coupon_manage, 'View Counpons', '/dashboard/coupon-manage/view-coupon', 1);
    menu.addSubItem(coupon_manage, 'Add Coupon', '/dashboard/coupon-manage/add-coupon', 2);

    let newsletters = menu.addItem('Newsletters', 'new_releases', null, 10, true);
    menu.addSubItem(newsletters, 'View Newsletters', '/dashboard/bullentin/view-bullentin', 1);
    menu.addSubItem(newsletters, 'Add Newslatters', '/dashboard/bullentin/add-bullentin', 2);

    let banner_images = menu.addItem('Banner Images', 'burst_mode', '/dashboard/banner-images', 11, true);
  }


    ngOnInit() {
      let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
      this.name = userInfo.name;
      // console.log(this.name);
    }


  addItem(name: string, icon: string, route: any, position: number, status: boolean, badge?: string, badgeColor?: string, customClass?: string) {

    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    let access = userInfo.access;
    // console.log(access);

    let item = new SidenavItem({
      name: name,
      icon: icon,
      route: route,
      subItems: [ ],
      status: status? access == "0": access == "1",
      position: position || 99,
      badge: badge || null,
      badgeColor: badgeColor || null,
      customClass: customClass || null
    });

    this._items.push(item);
    this._itemsSubject.next(this._items);

    return item;
  }

  addSubItem(parent: SidenavItem, name: string, route: any, position: number) {
    let item = new SidenavItem({
      name: name,
      route: route,
      parent: parent,
      subItems: [ ],
      position: position || 99
    });

    parent.subItems.push(item);
    this._itemsSubject.next(this._items);

    return item;
  }

  removeItem(item: SidenavItem) {
    let index = this._items.indexOf(item);
    if (index > -1) {
      this._items.splice(index, 1);
    }

    this._itemsSubject.next(this._items);
  }

  isOpen(item: SidenavItem) {
    return (this._currentlyOpen.indexOf(item) != -1);
  }

  toggleCurrentlyOpen(item: SidenavItem) {
    let currentlyOpen = this._currentlyOpen;

    if (this.isOpen(item)) {
      if (currentlyOpen.length > 1) {
        currentlyOpen.length = this._currentlyOpen.indexOf(item);
      } else {
        currentlyOpen = [ ];
      }
    } else {
      currentlyOpen = this.getAllParents(item);
    }

    this._currentlyOpen = currentlyOpen;
    this._currentlyOpenSubject.next(currentlyOpen);
  }

  getAllParents(item: SidenavItem, currentlyOpen: SidenavItem[] = [ ]) {
    currentlyOpen.unshift( item );

    if (item.hasParent()) {
      return this.getAllParents(item.parent, currentlyOpen);
    } else {
      return currentlyOpen;
    }
  }

  nextCurrentlyOpen(currentlyOpen: SidenavItem[]) {
    this._currentlyOpen = currentlyOpen;
    this._currentlyOpenSubject.next(currentlyOpen);
  }

  nextCurrentlyOpenByRoute(route: string) {
    let currentlyOpen = [ ];

    let item = this.findByRouteRecursive(route, this._items);

    if (item && item.hasParent()) {
      currentlyOpen = this.getAllParents(item);
    } else if (item) {
      currentlyOpen = [item];
    }

    this.nextCurrentlyOpen(currentlyOpen);
  }

  findByRouteRecursive(route: string, collection: SidenavItem[]) {
    let result = _.find(collection, { 'route': route });

    if (!result) {
      _.each(collection, (item) => {
        if (item.hasSubItems()) {
          let found = this.findByRouteRecursive(route, item.subItems);

          if (found) {
            result = found;
            return false;
          }
        }
      });
    }

    return result;
  }

  get currentlyOpen() {
    return this._currentlyOpen;
  }

  getSidenavItemByRoute(route) {
    return this.findByRouteRecursive(route, this._items);
  }
}
