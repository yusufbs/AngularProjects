import { Component, inject, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { setErrorMessage } from '../shared/shared.state';

@Component({
  selector: 'app-toaster',
  imports: [],
  templateUrl: './toaster.html',
  styleUrl: './toaster.css',
})
export class Toaster implements OnInit {
  @Input() errorMessage: string | null = '';
  private store: Store<AppState> = inject(Store<AppState>);
  ngOnInit() {
    setTimeout(() => {
      this.store.dispatch(setErrorMessage({ message: '' }));
    }, 5000);
  }
}
