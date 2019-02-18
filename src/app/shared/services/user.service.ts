import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import { AppUser } from '../models/app-user';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isAdmin: boolean
  userId: string

  constructor(
    private db: AngularFireDatabase,
    private auth: AuthService,
    private router: Router) {
    this.auth.user$.subscribe(u => {
      if (u === null) {
        return // exit if no user
      }
      this.userId = u.uid
      this.db.object('/users/' + this.userId).valueChanges().subscribe(x => {
        this.isAdmin = x['isAdmin']
      })
    })
  }

  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    })
  }

  get(uid: string): AngularFireObject<AppUser> {
    return this.db.object('/users/' + uid)
  }

  checkForAdmin() {

    if (this.isAdmin) {

      return true
    }
    this.router.navigate(['/'])
    return false

  }
}
