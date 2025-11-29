import { CounterService } from './../services/counter-service';
import { Component, inject, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-counter-value',
  imports: [],
  templateUrl: './counter-value.html',
  styleUrl: './counter-value.css',
})
export class CounterValue implements OnInit {
  svc = inject(CounterService);
  value = signal(0);

  ngOnInit(): void {
    this.value = this.svc.getValue();
  }
}
