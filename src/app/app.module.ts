import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MatIconRegistry, MatStepperModule, MatTableModule, MatDialogModule,} from "@angular/material";
import { RoutingModule } from "./app-routing.module";
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AlertsModule } from 'angular-alert-module';
import { CoreModule } from './core/core.module';
import { PagesModule } from './pages/pages.module';
import { LandingModule } from './landing/landing.module';
import { SortablejsModule } from 'angular-sortablejs';
import { ScrollbarModule } from './core/scrollbar/scrollbar.module';
// import { SwiperModule } from 'angular2-useful-swiper'; //or for angular-cli the path will be ../../node_modules/angular2-useful-swiper

import { AccessService } from '../provide/access.service';
import { UploadFileService } from '../provide/upload-file.service';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    PagesModule,
    LandingModule,
    SortablejsModule,
    ScrollbarModule,
    MatStepperModule,
    MatTableModule,
    MatDialogModule,
    // SwiperModule,
    AlertsModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCA4T-nbBt9fN_rO6Au3EB7XTil_P-cqVI",
      libraries: ["places"]
    }),
  ],
  providers: [
    MatIconRegistry,
    AccessService,
    UploadFileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
