import { Component, OnInit } from '@angular/core';
import {fadeInAnimation} from '../../route.animation';
import { widget1Data, widget4Data, widget3Data, widget2Data } from '../data/widgetDemoData.data';
import { lineChartWidgetData } from "../data/lineChartWidget.data";
import { sourceOverviewWidgetData } from "../data/source-overview-widget.data";


@Component({
  selector: 'ms-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [ fadeInAnimation ]
})
export class DashboardComponent implements OnInit {

  options;

  widget1Options;
  widget2Options;
  widget3Options;
  widget4Options;

  widget1Data;
  widget2Data;
  widget3Data;
  widget4Data;

  lineChartWidgetOptions;
  lineChartWidgetData;

  sourceOverviewWidgetOptions;
  sourceOverviewWidgetData;

  team;
  constructor() { }

  ngOnInit() {

    this.widget1Data = widget1Data;
    this.widget1Options = {
      icon: 'person',
      name: 'Users',
      number: this.widget1Data[0].values.reduce((a, b) => a + b.value, 0),
      gain: '14.8',
      description: '% compared to last week',
      arrow: 'arrow_upward'
    };


    this.widget2Data = widget2Data;
    this.widget2Options = {
      icon: 'flash_on',
      name: 'Visits',
      number: this.widget2Data[0].values.reduce((a, b) => a + b.value, 0),
      gain: '42.5',
      description: '% compared to last week',
      arrow: 'arrow_upward'
    };

    this.widget3Data = widget3Data;
    this.widget3Options = {
      icon: 'public',
      name: 'Total Clicks',
      number: this.widget3Data[0].values.reduce((a, b) => a + b.value, 0),
      gain: '-25.3',
      description: '% compared to last week',
      arrow: 'arrow_downward'
    };

    this.widget4Data = widget4Data;
    this.widget4Options = {
      icon: 'layers',
      name: 'Conversions',
      number: this.widget4Data[0].values.reduce((a, b) => a + b.value, 0),
      gain: '16.3',
      description: '% compared to last week',
      arrow: 'arrow_upward'
    };

    this.lineChartWidgetData = lineChartWidgetData;
    this.lineChartWidgetOptions = {
      icon: 'attach_money',
      name: 'Earnings Overview',
    };

    this.sourceOverviewWidgetData = sourceOverviewWidgetData;
    this.sourceOverviewWidgetOptions = {
      name: 'Traffic Sources'
    };
  }


}
