import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Loader } from './loader/loader';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import { getIsLoading } from './shared/shared.state';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [Header, RouterOutlet, Loader, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Angular_NgRx');

  showLoading$: Observable<boolean>;
  private store = inject(Store<AppState>);
  constructor() {
    this.showLoading$ = this.store.select(getIsLoading);
  }
}
