import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-count-down-timer',
  templateUrl: './count-down-timer.component.html',
  styleUrls: ['./count-down-timer.component.scss']
})
export class CountDownTimerComponent implements OnInit, OnDestroy {
  private _counterSubscription!: Subscription;
  private _end!: number;
  days!: number;
  hours!: number;
  minutes!: number;
  seconds!: number;


  constructor() {
    this._end = new Date('2023-02-04 10:00').getTime();
  }

  ngOnInit() {
    this._counterSubscription = interval(1000).subscribe(() => {
      const elapsed = this._end - Date.now();
      if (elapsed <= 0) {
        this._counterSubscription.unsubscribe();
        return;
      }
      this.days = Math.floor(elapsed / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((elapsed % (1000 * 60)) / 1000);
    });
  }

  ngOnDestroy() {
    this._counterSubscription.unsubscribe();
  }
}
