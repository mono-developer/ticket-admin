import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortablejsModule, SortablejsOptions } from 'angular-sortablejs';
import { CalendarModule } from 'angular-calendar';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { QuillModule } from 'ngx-quill';
import { SwiperModule } from 'angular2-useful-swiper'; //or for angular-cli the path will be ../../node_modules/angular2-useful-swiper

import { MainComponent, BookingDialogComponent, DescriptionDialogComponent } from './main/main.component';
import { BookingComponent, LocationDialogComponent, TimeOverComponent } from './booking/booking.component';
import { AdminComponent } from './admin/admin.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SearchComponent } from './toolbar/search/search.component';
import { SearchBarComponent } from './toolbar/search-bar/search-bar.component';
import { ToolbarNotificationsComponent } from './toolbar/toolbar-notifications/toolbar-notifications.component';
import { ToolbarUserButtonComponent } from './toolbar/toolbar-user-button/toolbar-user-button.component';


import { LandingRoutingModule } from "./landing-routing.module";
import { MaterialComponentsModule } from '../material-components.module';
import { HighlightModule } from '../core/highlightjs/highlight.module';
import { ScrollbarModule } from '../core/scrollbar/scrollbar.module';
import { MatIconRegistry, MatStepperModule, MatTableModule, MatDialogModule, } from "@angular/material";

import { LoadingOverlayModule } from '../core/loading-overlay/loading-overlay.module';
import { WidgetseModule } from '../core/widgets/widgets.module';
import { TicketDataService } from "../../provide/ticketDemoService";
import { BaseService } from "../../provide/base-service";
import { DataService } from "../../provide/data-service";

import { AgmCoreModule } from '@agm/core';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    LandingRoutingModule,
    MaterialComponentsModule,
    FlexLayoutModule,
    QuillModule,
    HighlightModule,
    SortablejsModule,
    CalendarModule.forRoot(),
    ScrollbarModule,
    SwiperModule,
    MatStepperModule,
    MatDialogModule,
    MatTableModule,
    LoadingOverlayModule,
    WidgetseModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCA4T-nbBt9fN_rO6Au3EB7XTil_P-cqVI",
      libraries: ["places"]
    }),
  ],
  entryComponents: [
    BookingDialogComponent,
    DescriptionDialogComponent,
    LocationDialogComponent,
    TimeOverComponent
  ],
  declarations: [
    MainComponent,
    BookingDialogComponent,
    DescriptionDialogComponent,
    BookingComponent,
    LocationDialogComponent,
    TimeOverComponent,
    AdminComponent,
    ToolbarComponent,
    SearchComponent,
    SearchBarComponent,
    ToolbarNotificationsComponent,
    ToolbarUserButtonComponent
  ],
  providers: [
    TicketDataService,
    BaseService,
    DataService
  ]
})
export class LandingModule { }
