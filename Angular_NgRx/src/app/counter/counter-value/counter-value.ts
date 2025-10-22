import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CounterState, getCounter } from '../states/counter.state';

@Component({
  selector: 'app-counter-value',
  imports: [],
  templateUrl: './counter-value.html',
  styleUrl: './counter-value.css',
})
export class CounterValue implements OnInit, OnDestroy {
  constructor(private store: Store<{ counter: CounterState }>) {}

  counter: number = 0;
  counterSubscription: Subscription | null = null;

  ngOnInit(): void {
    this.counterSubscription = this.store.select(getCounter).subscribe((counter) => {
      this.counter = counter;
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe if necessary
    this.counterSubscription?.unsubscribe();
  }
}
