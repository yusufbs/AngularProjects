import { Component } from '@angular/core';
import { CounterValue } from './counter-value/counter-value';
import { CounterButton } from './counter-button/counter-button';
import { CounterInput } from './counter-input/counter-input';
import { CounterService } from './services/counter.service';

@Component({
  selector: 'app-counter',
  imports: [CounterValue, CounterButton, CounterInput],
  providers: [CounterService],
  templateUrl: './counter.html',
  styleUrl: './counter.css',
})
export class Counter {}
