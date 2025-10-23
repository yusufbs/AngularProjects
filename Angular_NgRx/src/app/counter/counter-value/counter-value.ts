import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CounterState, getCounter } from '../states/counter.state';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-counter-value',
  imports: [AsyncPipe],
  templateUrl: './counter-value.html',
  styleUrl: './counter-value.css',
})
export class CounterValue implements OnInit {
  constructor(private store: Store<{ counter: CounterState }>) {}

  counter$: Observable<number> | null = null;

  ngOnInit(): void {
    this.counter$ = this.store.select(getCounter);
  }
}
