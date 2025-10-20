import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-counter-value',
  imports: [],
  templateUrl: './counter-value.html',
  styleUrl: './counter-value.css',
})
export class CounterValue {
  @Input() count: number = 0;
}
