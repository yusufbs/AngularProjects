import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  // private store: Store<AppState> = inject(Store<AppState>);
  // loggedUser$: Observable<User | null> | undefined;
  ngOnInit() {
    // this.loggedUser$ = this.store.select(getLoggedInUser);
  }
  // onLogoutClicked() {
  //   this.store.dispatch(logoutAction());
  // }
}
