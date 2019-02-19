import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';

// import { CanActivate } from '@angular/router/src/utils/preactivation';
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
