import { Component, OnInit } from '@angular/core';
import {fadeInAnimation} from "../../../route.animation";

@Component({
  selector: 'ms-add-cms',
  templateUrl: './add-cms.component.html',
  styleUrls: ['./add-cms.component.scss'],
  host: {
    "[@fadeInAnimation]": 'true'
  },
  animations: [ fadeInAnimation ]
})
export class AddCMSComponent implements OnInit {

  page_title: string = 'Add New Page';

  cmsData: any;
  text: string;
  stateList: any;
  title: string;

  constructor() {
    this.cmsData = { title: '', description: '', state: ''};
    this.stateList = [ { id: 0, name: 'Activate'},
                       { id: 1, name: 'Deactivate'}
                    ];

  }

  ngOnInit() {
  }

  setNewUser(value) {
    console.log('selected');
  }

  submit() {
    console.log( this.cmsData);
  }

}
