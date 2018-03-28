import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from "./admin/admin.component";
import { MainComponent } from "./main/main.component";
import { BookingComponent } from './booking/booking.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: MainComponent,
        pathMatch: 'full'
      },
      {
        path: 'booking',
        component: BookingComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class LandingRoutingModule { }
