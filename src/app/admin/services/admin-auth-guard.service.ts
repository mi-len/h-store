import { Injectable } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
// import { CanActivate } from '@angular/router/src/utils/preactivation';
import { CanActivate } from '@angular/router';

import { map } from 'rxjs/operators';
import { UserService } from '../../shared/services/user.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private router: Router ) { }

    isAdmin: boolean
    userId: string

  canActivate (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    return this.userService.checkForAdmin()
  }
}
