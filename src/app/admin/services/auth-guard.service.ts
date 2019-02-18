import { Injectable } from '@angular/core';
// import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AuthService } from '../../shared/services/auth.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import 'rxjs/add/operator/map'
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
    ) { }

  canActivate( route, state: RouterStateSnapshot ) {
    return this.auth.user$.pipe(map(user => {
      if (user) return true
    
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }})
      return false
     }))
  }

  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): boolean {

  //   return this.check();
  // }

  // check() {
  //   this.auth.user$.pipe(map(user => {
  //     if (user) return true
  //   }))

  //   this.router.navigate(['/login'], { queryParams: {returnUrl: state.url }})
  //   return false
    
  // }
}
