import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ms-add-bullentin',
  templateUrl: './add-bullentin.component.html',
  styleUrls: ['./add-bullentin.component.scss']
})
export class AddBullentinComponent implements OnInit {


  page_title: string = 'Add NewsLetter';

  letterData: any = { title: '', description: '' };
  letterList: any;
  constructor(
    public router: Router,
    public route: ActivatedRoute
  ) {
    this.letterList = [
      { id: 1, title: 'Test', description: 'Testing for the newsletter', symbol: '' },
      { id: 2, title: 'TESTING NEWSLETTER IN FEB', description: 'testing', symbol: '' },
      { id: 3, title: 'Main Headlines', description: 'We are testing now for newsletter', symbol: '' },
      { id: 4, title: 'Proof', description: 'I need to test this', symbol: '' },
    ];
   }

  ngOnInit() {
    let item = this.route.snapshot.paramMap.get('item');
    console.log('item', item);
    if(item){
      let getItem = this.filterItems(item);
      this.letterData = getItem[0];
    }

    console.log('item', this.letterData);
  }

  filterItems(searchItem) {
    return this.letterList.filter(
      item => searchItem.indexOf(item.id) > -1);
  }

  submit() {
    console.log(this.letterData);
    this.router.navigate(['bullentin/view-bullentin']);
  }

}
