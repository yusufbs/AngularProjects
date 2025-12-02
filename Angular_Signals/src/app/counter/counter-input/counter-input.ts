import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CounterService } from '../services/counter.service';

@Component({
  selector: 'app-counter-input',
  imports: [FormsModule],
  templateUrl: './counter-input.html',
  styleUrl: './counter-input.css',
})
export class CounterInput implements OnInit {
  svc = inject(CounterService);
  customValue: number = 0;
  showCustomInput = signal(false);

  ngOnInit(): void {
    this.showCustomInput = this.svc.getCustomInput();
  }

  onToggleClicked() {
    this.svc.toggleCustomInput();
  }

  onCustomValueButtonClicked() {
    this.svc.customIncrement(+this.customValue);
  }
}
