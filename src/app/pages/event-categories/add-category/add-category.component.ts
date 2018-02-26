import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ms-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  page_title: string = "Add Category";
  cateData: any = { name: '', value: '' };
  stateList: any;

  constructor() {

    this.stateList = [ { id: 0, value: 'Activate'},
                       { id: 1, value: 'Deactivate'}
                    ];
  }

  ngOnInit() {
  }

}
