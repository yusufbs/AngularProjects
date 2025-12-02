import { Component, inject } from '@angular/core';
import { CounterService } from '../services/counter.service';

@Component({
  selector: 'app-counter-button',
  imports: [],
  templateUrl: './counter-button.html',
  styleUrl: './counter-button.css',
})
export class CounterButton {
  svc = inject(CounterService);

  onDecrement() {
    console.log('Decrement clicked');
    this.svc.decrement();
  }

  onReset() {
    console.log('Reset clicked');
    this.svc.reset();
  }

  onIncrement() {
    console.log('Increment clicked');
    this.svc.increment();
  }
}
