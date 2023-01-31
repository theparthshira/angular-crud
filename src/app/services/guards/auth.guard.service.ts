import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getUserSignned, RootReducerState } from 'src/app/reducers';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private store: Store<RootReducerState>, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    let signned;
    this.store.select(getUserSignned).subscribe((data) => (signned = data));

    if (signned) {
      return true;
    } else {
      return this.router.navigate(['/']);
    }
  }
}
