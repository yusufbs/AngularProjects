import { Injectable, signal } from '@angular/core';

@Injectable()
export class CounterService {
  private counterValue = signal(0);
  private customInput = signal(false);

  increment() {
    this.counterValue.update((v) => v + 1);
  }

  reset() {
    this.counterValue.set(0);
  }

  decrement() {
    this.counterValue.update((v) => v - 1);
  }

  getValue() {
    return this.counterValue;
  }

  toggleCustomInput() {
    this.customInput.update((v) => !v);
  }

  customIncrement(value: number) {
    this.counterValue.update((v) => v + value);
  }

  getCustomInput() {
    return this.customInput;
  }
}
