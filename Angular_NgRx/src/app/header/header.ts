import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

import { AsyncPipe } from '@angular/common';
import { getLoggedInUser } from '../auth/state/auth.selectors';
import { logoutAction } from '../auth/state/auth.actions';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  private store: Store<AppState> = inject(Store<AppState>);

  loggedUser$: Observable<User | null> | undefined;

  ngOnInit() {
    this.loggedUser$ = this.store.select(getLoggedInUser);
  }

  onLogoutClicked() {
    this.store.dispatch(logoutAction());
  }
}
