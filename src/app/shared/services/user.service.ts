import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import { AppUser } from '../models/app-user';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators'

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
        // this.isAdmin = x['isAdmin'] // uncomment for Admin check !!
        this.isAdmin = true // temporary all user will will have admin rights 
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

  async getUserName(id: string) {
    await this.db.object('/users/' + id).valueChanges().subscribe(x => {
      let name = x['name']
      console.log('name: inside subscription', name);

      return name
    })
    console.log('name after in serr=vice', name);
    
    // let name = await this.get(id).valueChanges()
    // console.log('get returns ', name);
    //  this.get(id)
  }

  checkForAdmin() {

    return true // temporary all user will will have admin rights 

    // if (this.isAdmin) {
    //   return true
    // }
    // this.router.navigate(['/'])
    // return false

  }
}
