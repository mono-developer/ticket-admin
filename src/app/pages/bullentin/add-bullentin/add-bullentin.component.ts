import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ms-add-bullentin',
  templateUrl: './add-bullentin.component.html',
  styleUrls: ['./add-bullentin.component.scss']
})
export class AddBullentinComponent implements OnInit {


  page_title: string = 'Add NewsLetter';

  letterData: any = { title: '', description: '' };
  constructor() { }

  ngOnInit() {
  }

}
