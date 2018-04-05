import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from "./core/admin/admin.component";

import { AddCMSComponent } from './pages/content-manage/add-cms/add-cms.component';
import { ViewCMSComponent } from './pages/content-manage/view-cms/view-cms.component';
import { ViewSaleUsersComponent } from './pages/sales-point/view-sale-users/view-sale-users.component';
import { AddSaleUsersComponent } from './pages/sales-point/add-sale-users/add-sale-users.component';
import { AddCategoryComponent } from './pages/event-categories/add-category/add-category.component';
import { ViewCategoryComponent } from './pages/event-categories/view-category/view-category.component';
import { ViewEventComponent } from './pages/event-manage/view-event/view-event.component';
import { AddEventComponent } from './pages/event-manage/add-event/add-event.component';
import { AddOrganizorComponent } from './pages/organizor-manage/add-organizor/add-organizor.component';
import { ViewOrganizorComponent } from './pages/organizor-manage/view-organizor/view-organizor.component';
import { AddCouponComponent } from './pages/coupon-manage/add-coupon/add-coupon.component';
import { ViewCouponComponent } from './pages/coupon-manage/view-coupon/view-coupon.component';
import { ViewBullentinComponent } from './pages/bullentin/view-bullentin/view-bullentin.component';
import { AddBullentinComponent } from './pages/bullentin/add-bullentin/add-bullentin.component';
import { BannerImagesComponent } from './pages/banner-images/banner-images.component';
import { UsersManageComponent } from './pages/users-manage/users-manage.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/settings/login/login.component';
import { ForgotPasswordComponent } from './pages/settings/forgot-password/forgot-password.component';
import { RegisterComponent } from './pages/settings/register/register.component';
import { ProfileComponent } from './pages/settings/profile/profile.component';
import { GeneralReportsComponent } from './pages/financial-reports/general-reports/general-reports.component';
import { DateReportsComponent } from './pages/financial-reports/date-reports/date-reports.component';

import { AccessService } from '../provide/access.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },

  { path: 'dashboard', component: AdminComponent, canActivate: [AccessService], children: [
        { path: '', component: DashboardComponent },
        { path: 'profile', component: ProfileComponent },
        { path: 'content-manage/view-cms', component: ViewCMSComponent },
        { path: 'content-manage/add-cms', component: AddCMSComponent },
        { path: 'sales-point/view-sale-users', component: ViewSaleUsersComponent },
        { path: 'sales-point/add-sale-users', component: AddSaleUsersComponent },
        { path: 'event-categories/view-category', component: ViewCategoryComponent },
        { path: 'event-categories/add-category', component: AddCategoryComponent },
        { path: 'event-manage/view-event', component: ViewEventComponent },
        { path: 'event-manage/add-event', component: AddEventComponent },
        { path: 'users-manage', component: UsersManageComponent },
        { path: 'organizor-manage/view-organizor', component: ViewOrganizorComponent },
        { path: 'organizor-manage/add-organizor', component: AddOrganizorComponent },
        { path: 'financial-reports/general-reports', component: GeneralReportsComponent },
        { path: 'financial-reports/date-reports', component: DateReportsComponent },
        { path: 'coupon-manage/view-coupon', component: ViewCouponComponent },
        { path: 'coupon-manage/add-coupon', component: AddCouponComponent },
        { path: 'bullentin/view-bullentin', component: ViewBullentinComponent },
        { path: 'bullentin/add-bullentin', component: AddBullentinComponent },
        { path: 'banner-images', component: BannerImagesComponent }
      ]
    }
 ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class RoutingModule { }
