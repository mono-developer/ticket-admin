import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { fadeInAnimation } from "../../../route.animation";

import { BaseService } from "../../../../provide/base-service";
import { DataService } from "../../../../provide/data-service";


@Component({
  selector: 'ms-customer-signup',
  templateUrl: './customer-signup.component.html',
  styleUrls: ['./customer-signup.component.scss'],
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [fadeInAnimation]
})
export class CustomerSignupComponent implements OnInit {

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

