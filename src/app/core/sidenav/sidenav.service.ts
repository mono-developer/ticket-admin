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

  constructor(
    snackbar: MatSnackBar
  ) {
    let menu = this;

    let dashboard = menu.addItem('Dashboard', 'dashboard', '/', 1);

    let content_manage = menu.addItem('Content Management', 'content_copy', null, 2);
    menu.addSubItem(content_manage, 'View Pages', '/content-manage/view-cms', 1);
    menu.addSubItem(content_manage, 'Add Page', '/content-manage/add-cms', 2);

    let team_manage = menu.addItem('Management of sales teams', 'group', null, 3);
    menu.addSubItem(team_manage, 'View sales team user', '/saleTeam-manage/view-sale-users', 1);
    menu.addSubItem(team_manage, 'Add user of the sales team', '/saleTeam-manage/add-sale-users', 2);

    let event_category = menu.addItem('Event Categories', 'event_note', null, 4);
    menu.addSubItem(event_category, 'View Categories', '/event-categories/view-category', 1);
    menu.addSubItem(event_category, 'Add Category', '/event-categories/add-category', 2);

    let event_manage = menu.addItem('Event Management', 'map', null, 5);
    menu.addSubItem(event_manage, 'View Events', '/event-manage/view-event', 1);
    menu.addSubItem(event_manage, 'Add Event', '/event-manage/add-event', 2);

    let user_manage = menu.addItem('User Management', 'person', '/users-manage', 6);

    let organization_manage = menu.addItem('Organization Management', 'group_add', null, 7);
    menu.addSubItem(organization_manage, 'View Organizations', '/organization-manage/view-organization', 1);
    menu.addSubItem(organization_manage, 'Add Organization', '/organization-manage/add-organization', 2);

    let reports = menu.addItem('Reports', 'report', null, 8);
    menu.addSubItem(reports, 'Gereral Reports ', '/reports/general-reports', 1);
    menu.addSubItem(reports, 'Date of Reports', '/reports/date-reports', 2);

    let coupon_manage = menu.addItem('Managemant of coupons', 'credit_card', null, 9);
    menu.addSubItem(coupon_manage, 'View Counpons', '/coupon-manage/view-coupon', 1);
    menu.addSubItem(coupon_manage, 'Add Coupon', '/coupon-manage/add-coupon', 2);

    let newsletters = menu.addItem('Newsletters', 'new_releases', null, 10);
    menu.addSubItem(newsletters, 'View Newsletters', '/bullentin/view-bullentin', 1);
    menu.addSubItem(newsletters, 'Add Newslatters', '/bullentin/add-bullentin', 2);

    let banner_images = menu.addItem('Banner Images', 'burst_mode', '/banner-images', 11);

    let news = menu.addItem('News', 'fiber_new', null, 12);
    menu.addSubItem(news, 'View News', '/news/view-news', 1);
    menu.addSubItem(news, 'Add News', '/news/add-news', 2);

  }

  addItem(name: string, icon: string, route: any, position: number, badge?: string, badgeColor?: string, customClass?: string) {
    let item = new SidenavItem({
      name: name,
      icon: icon,
      route: route,
      subItems: [ ],
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
