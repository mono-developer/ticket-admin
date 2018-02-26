import { Component, OnInit } from '@angular/core';
import { routeAnimation } from "../../../route.animation";
import * as _ from 'lodash';


@Component({
  selector: 'ms-add-sale-users',
  templateUrl: './add-sale-users.component.html',
  styleUrls: ['./add-sale-users.component.scss'],
  host: {
    '[@routeAnimation]': 'true'
  },
  animations: [ routeAnimation ]
})
export class AddSaleUsersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  getEscaped(text: string) {
    return _.escape(text);
  }

}
