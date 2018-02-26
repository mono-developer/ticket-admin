import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ms-add-organization',
  templateUrl: './add-organization.component.html',
  styleUrls: ['./add-organization.component.scss']
})
export class AddOrganizationComponent implements OnInit {

  page_title : string = "Add Organization";
  stateList: any;
  orgData: any = { o_name: '', o_number: '', person: '', eamil: '', password: '', mobile: '', address: '', value: ''  }
  constructor() {

    this.stateList = [ { id: 0, name: 'Activate'},
                       { id: 1, name: 'Deactivate'}
                      ];
  }

  ngOnInit() {
  }

}
