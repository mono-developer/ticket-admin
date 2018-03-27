import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { environment } from "../../../environments/environment";
import { MaterialComponentsModule } from '../../material-components.module';
import { LoadingOverlayModule } from '../loading-overlay/loading-overlay.module';
import { ChartsComModule } from '../charts/charts-com.module';

import { ActivityComponent } from './activity/activity.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { GoogleMapsWidgetComponent } from './google-maps-widget/google-maps-widget.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { RecentSalesComponent } from './recent-sales/recent-sales.component';
import { TrafficSourcesComponent } from './traffic-sources/traffic-sources.component';
import { LineChartWidgetComponent } from './widgets-v1/line-chart-widget/line-chart-widget.component';
import { SourceOverviewWidgetComponent } from './widgets-v1/source-overview-widget/source-overview-widget.component';
import { WidgetComponent } from './widgets-v1/widget-v1/widget-v1.component';

import { D3ChartService } from "../charts/nvD3/nvD3.service";
@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleApi
    }),
    MaterialComponentsModule,
    LoadingOverlayModule,
    ChartsComModule
  ],
  declarations: [
    ActivityComponent,
    BarChartComponent,
    GoogleMapsWidgetComponent,
    LineChartComponent,
    PieChartComponent,
    RecentSalesComponent,
    TrafficSourcesComponent,
    LineChartWidgetComponent,
    SourceOverviewWidgetComponent,
    WidgetComponent    
  ],
  exports: [
    ActivityComponent,
    BarChartComponent,
    GoogleMapsWidgetComponent,
    LineChartComponent,
    PieChartComponent,
    RecentSalesComponent,
    TrafficSourcesComponent,
    LineChartWidgetComponent,
    SourceOverviewWidgetComponent,
    WidgetComponent
  ],
  providers: [
    D3ChartService
  ]
})
export class WidgetseModule { }
