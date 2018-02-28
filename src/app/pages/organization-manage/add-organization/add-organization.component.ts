import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ms-add-organization',
  templateUrl: './add-organization.component.html',
  styleUrls: ['./add-organization.component.scss']
})
export class AddOrganizationComponent implements OnInit {

  page_title : string = "Add Organization";
  stateList: any;
  orgData: any = { name: '', number: '', person: '', eamil: '', mobile: '', address: '', value: '' }
  constructor() {

    this.stateList = [ { id: 0, name: 'Activate', value: true },
                       { id: 1, name: 'Deactivate', value: false }
                      ];
  }

  ngOnInit() {
  }

  submit() {
    console.log(this.orgData);
  }

}
