import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Actions, State, Queries } from 'ngrx-domains';

@Component({
  selector: 'book-collection-app',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bc-layout>
      <bc-sidenav [open]="showSidenav$ | async">
        <bc-nav-item (activate)="closeSidenav()" routerLink="/" icon="book" hint="View your book collection">
          My Collection
        </bc-nav-item>
        <bc-nav-item (activate)="closeSidenav()" routerLink="/book/find" icon="search" hint="Find your next book!">
          Browse Books
        </bc-nav-item>
        <bc-nav-item (activate)="closeSidenav()" routerLink="/stats" icon="assessment" hint="Login">
          Statistics
        </bc-nav-item>
        <bc-nav-item (activate)="closeSidenav()" routerLink="/movies" icon="movie" hint="Movies">
          Movies
        </bc-nav-item>
      </bc-sidenav>
      <bc-toolbar (openMenu)="openSidenav()">
        Book Collection
      </bc-toolbar>

      <router-outlet></router-outlet>
    </bc-layout>
  `
})
export class AppComponent {
  showSidenav$: Observable<boolean>;

  constructor(private store: Store<State>) {
    /**
     * Selectors can be applied with the `select` operator which passes the state
     * tree to the provided selector
     */
    this.showSidenav$ = this.store.select(Queries.layout.getShowSidenav);
  }

  closeSidenav() {
    /**
     * All state updates are handled through dispatched actions in 'container'
     * components. This provides a clear, reproducible history of state
     * updates and user interaction through the life of our
     * application.
     */
    this.store.dispatch(new Actions.layout.CloseSidenavAction());
  }

  openSidenav() {
    this.store.dispatch(new Actions.layout.OpenSidenavAction());
  }
}
