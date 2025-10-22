import { Component, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterState, decrement, increment, reset } from '../states/counter.state';

@Component({
  selector: 'app-counter-button',
  imports: [],
  templateUrl: './counter-button.html',
  styleUrl: './counter-button.css',
})
export class CounterButton {
  constructor(private store: Store<{ counter: CounterState }>) {}

  onDecrement() {
    this.store.dispatch(decrement());
  }

  onReset() {
    this.store.dispatch(reset());
  }

  onIncrement() {
    this.store.dispatch(increment());
  }
}
