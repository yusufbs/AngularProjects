import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-counter-button',
  imports: [],
  templateUrl: './counter-button.html',
  styleUrl: './counter-button.css',
})
export class CounterButton {
  @Output() incrementClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() decrementClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() resetClicked: EventEmitter<void> = new EventEmitter<void>();
  onDecrement() {
    this.decrementClicked.emit();
  }
  onReset() {
    this.resetClicked.emit();
  }
  onIncrement() {
    this.incrementClicked.emit();
  }
}
