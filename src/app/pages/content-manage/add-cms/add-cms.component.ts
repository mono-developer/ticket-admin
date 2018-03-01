import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from "../../../route.animation";
import { ActivatedRoute } from '@angular/router';

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
  stateList: any;
  cmsList: any;

  constructor(
    public route: ActivatedRoute
  ) {
    this.cmsData = { title: '', description: '', state: ''};
    this.cmsList = [  { id: 1, title: 'Press Notices', description: 'A page to do the tsting, A page to do the tsting, A page to do the tsting', state: 'Active', symbol: 'H' },
                      { id: 2, title: 'Hello', description: 'Helium', state: 'Active', symbol: 'He' },
                      { id: 3, title: 'No mouth', description: 'Lithium', state: 'Active', symbol: 'Li' }
                  ];
    this.stateList = [ { id: 0, name: 'Active', state: true},
                       { id: 1, name: 'Deactivate', state: false}
                    ];

  }

  ngOnInit() {
    let item = this.route.snapshot.paramMap.get('item');
    console.log('item', item);
    if(item){
      let getItem = this.filterItems(item);
      this.cmsData = getItem[0];
    }
    console.log('item', this.cmsData);
  }

  filterItems(searchItem) {
    return this.cmsList.filter(
      item => searchItem.indexOf(item.id) > -1);
  }

  setNewUser(value) {
    console.log('selected');
  }

  submit() {
    console.log( this.cmsData);
  }

}
