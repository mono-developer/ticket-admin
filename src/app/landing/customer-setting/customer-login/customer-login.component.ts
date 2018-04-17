import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { fadeInAnimation } from "../../../route.animation";

import { BaseService } from "../../../../provide/base-service";
import { DataService } from "../../../../provide/data-service";

@Component({
  selector: 'ms-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.scss'],
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [fadeInAnimation]
})
export class CustomerLoginComponent implements OnInit {

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public baseService: BaseService,
    public dataService: DataService
  ) {

  }

  ngOnInit() {

  }


}

