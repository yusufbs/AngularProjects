import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getCounter } from '../states/counter.state';
import { AsyncPipe } from '@angular/common';
import { AppState } from '../../store/app.state';

@Component({
  selector: 'app-counter-value',
  imports: [AsyncPipe],
  templateUrl: './counter-value.html',
  styleUrl: './counter-value.css',
})
export class CounterValue implements OnInit {
  constructor(private store: Store<AppState>) {}

  counter$: Observable<number> | null = null;

  ngOnInit(): void {
    this.counter$ = this.store.select(getCounter);
  }
}
