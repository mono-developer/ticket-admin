import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'ms-general-reports',
  templateUrl: './general-reports.component.html',
  styleUrls: ['./general-reports.component.scss']
})
export class GeneralReportsComponent implements OnInit {

  orginalTime: number;
  newTime: number;
  counterTimer: number;
  constructor() { }

  ngOnInit() {
    this.orginalTime = new Date().getTime();
    this.getCounterTimer();
  }

  getCounterTimer() {
    let timer = Observable.timer(5, 100);
    const subscription = timer.subscribe(t => {
      this.newTime = new Date().getTime();
      let counterTimer: any = (this.newTime - this.orginalTime)/1000;
      this.counterTimer = parseInt(counterTimer);

      if(this.counterTimer == 30){
        console.log(this.counterTimer);
        subscription.unsubscribe();
      }

    });


  }
}
