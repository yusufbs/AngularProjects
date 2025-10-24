import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { customIncrement, getToggle, toggleCustomInput } from '../states/counter.state';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { AppState } from '../../store/app.state';

@Component({
  selector: 'app-counter-input',
  imports: [FormsModule, AsyncPipe],
  templateUrl: './counter-input.html',
  styleUrl: './counter-input.css',
})
export class CounterInput implements OnInit {
  constructor(private store: Store<AppState>) {}

  customValue: number = 0;
  showCustomInput$: Observable<boolean> | null = null;

  ngOnInit(): void {
    this.showCustomInput$ = this.store.select(getToggle);
  }

  onToggleClicked() {
    this.store.dispatch(toggleCustomInput());
  }

  onCustomValueButtonClicked() {
    this.store.dispatch(customIncrement({ value: +this.customValue }));
  }
}
