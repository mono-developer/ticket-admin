import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetseModule } from '../core/widgets/widgets.module';
import { LoadingOverlayModule } from '../core/loading-overlay/loading-overlay.module';
// import { WidgetComponent } from '../core/widgets/widgets-v1/widget-v1/widget-v1.component';
// import { LineChartWidgetComponent } from '../core/widgets/widgets-v1/line-chart-widget/line-chart-widget.component';
// import { SourceOverviewWidgetComponent } from '../core/widgets/widgets-v1/source-overview-widget/source-overview-widget.component';
// import { nvD3 } from '../core/charts/nvD3/nvD3.component';
// import { BarChartComponent } from '../core/widgets/bar-chart/bar-chart.component';
// import { LineChartComponent } from '../core/widgets/line-chart/line-chart.component';
// import { RecentSalesComponent } from '../core/widgets/recent-sales/recent-sales.component';
// import { PieChartComponent } from '../core/widgets/pie-chart/pie-chart.component';
// import { GoogleMapsWidgetComponent } from '../core/widgets/google-maps-widget/google-maps-widget.component';
// import { ActivityComponent } from '../core/widgets/activity/activity.component';
// import { TrafficSourcesComponent } from '../core/widgets/traffic-sources/traffic-sources.component';
// import { LoadingOverlayComponent } from '../core/loading-overlay/loading-overlay.component';
import { environment } from "../../environments/environment";
import { SortablejsModule, SortablejsOptions } from 'angular-sortablejs';
// import { D3ChartService } from '../core/charts/nvD3/nvD3.service';
import { CalendarModule } from 'angular-calendar';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RoutingModule } from '../app-routing.module';
import { MaterialComponentsModule } from '../material-components.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AlertsModule } from 'angular-alert-module';
import { AgmCoreModule } from '@agm/core';
import { HighlightModule } from '../core/highlightjs/highlight.module';
import { QuillModule } from 'ngx-quill';
import { ScrollbarModule } from '../core/scrollbar/scrollbar.module';
import { AddCMSComponent } from './content-manage/add-cms/add-cms.component';
import { ViewCMSComponent } from './content-manage/view-cms/view-cms.component';
import { ViewSaleUsersComponent } from './sales-point/view-sale-users/view-sale-users.component';
import { AddSaleUsersComponent } from './sales-point/add-sale-users/add-sale-users.component';
import { AddCategoryComponent } from './event-categories/add-category/add-category.component';
import { ViewCategoryComponent } from './event-categories/view-category/view-category.component';
import { ViewEventComponent } from './event-manage/view-event/view-event.component';
import { AddEventComponent, EventDatailsDialogComponent, SeatDatailsDialogComponent } from './event-manage/add-event/add-event.component';
import { AddOrganizorComponent } from './organizor-manage/add-organizor/add-organizor.component';
import { ViewOrganizorComponent } from './organizor-manage/view-organizor/view-organizor.component';
import { AddCouponComponent } from './coupon-manage/add-coupon/add-coupon.component';
import { ViewCouponComponent } from './coupon-manage/view-coupon/view-coupon.component';
import { ViewBullentinComponent } from './bullentin/view-bullentin/view-bullentin.component';
import { AddBullentinComponent } from './bullentin/add-bullentin/add-bullentin.component';
import { BannerImagesComponent } from './banner-images/banner-images.component';
import { UsersManageComponent } from './users-manage/users-manage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent, LoginErrorDialog, AccessErrorDialog } from './settings/login/login.component';
import { ForgotPasswordComponent } from './settings/forgot-password/forgot-password.component';
import { RegisterComponent, SignupErrorDialog, PasswordErrorDialog } from './settings/register/register.component';
import { GeneralReportsComponent } from './financial-reports/general-reports/general-reports.component';
import { DateReportsComponent } from './financial-reports/date-reports/date-reports.component';

import { PageHeaderModule } from "../core/page-header/page-header.module";
import { MatIconRegistry, MatStepperModule, MatTableModule, MatDialogModule,} from "@angular/material";
import { UserService } from "../../provide/user-service";
import { BaseService } from "../../provide/base-service";
import { DataService } from "../../provide/data-service";
import { UploadFileService } from '../../provide/upload-file.service';
import { ImageSize } from "../../provide/image-size";

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    RoutingModule,
    MaterialComponentsModule,
    FlexLayoutModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleApi
    }),
    QuillModule,
    HighlightModule,
    SortablejsModule,
    PageHeaderModule,
    CalendarModule.forRoot(),
    ScrollbarModule,
    MatStepperModule,
    MatTableModule,
    MatDialogModule,
    AlertsModule.forRoot(),
    WidgetseModule,
    LoadingOverlayModule
  ],
  entryComponents: [
    EventDatailsDialogComponent,
    SeatDatailsDialogComponent,
    LoginErrorDialog,
    AccessErrorDialog,
    SignupErrorDialog,
    PasswordErrorDialog
  ],
  declarations: [
    AddCMSComponent,
    ViewCMSComponent,
    ViewSaleUsersComponent,
    AddSaleUsersComponent,
    AddCategoryComponent,
    ViewCategoryComponent,
    ViewEventComponent,
    AddEventComponent,
    AddOrganizorComponent,
    ViewOrganizorComponent,
    AddCouponComponent,
    ViewCouponComponent,
    ViewBullentinComponent,
    AddBullentinComponent,
    BannerImagesComponent,
    UsersManageComponent,
    DashboardComponent,
    LoginComponent,
    ForgotPasswordComponent,
    RegisterComponent,
    GeneralReportsComponent,
    DateReportsComponent,
    EventDatailsDialogComponent,
    SeatDatailsDialogComponent,
    LoginErrorDialog,
    AccessErrorDialog,
    SignupErrorDialog,
    PasswordErrorDialog
  ],
  providers: [
    // D3ChartService,
    UserService,
    BaseService,
    DataService,
    UploadFileService,
    ImageSize,
  ]
})
export class PagesModule { }
