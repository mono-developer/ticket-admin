import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { routeAnimation } from "../../route.animation";

@Component({
  selector: 'ms-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  host: {
    '[@routeAnimation]': 'true'
  },
  animations: [ routeAnimation ]
})
export class PageHeaderComponent implements OnInit {

  @Input() title: string ='';
  @Input() button: string ='';
  @Output() addEventPage = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onClickEvent() {
    this.addEventPage.emit();
  }

}
