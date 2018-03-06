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
import { CoreModule } from './core/core.module';
import { PagesModule } from './pages/pages.module';
import { SortablejsModule } from 'angular-sortablejs';
import { ScrollbarModule } from './core/scrollbar/scrollbar.module';

import { AccessService } from '../provide/access.service';
import { UploadFileService } from '../provide/upload-file.service';


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
    SortablejsModule,
    ScrollbarModule,
    MatStepperModule,
    MatTableModule,
    MatDialogModule,
  ],
  providers: [
    MatIconRegistry,
    AccessService,
    UploadFileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
