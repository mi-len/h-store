import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

import { map } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userId: string
  testSubject: any
  
  constructor(private auth: AuthService, private userService: UserService) { }
  ngOnInit() {
  }

  getNeshto() {
    
    // this.auth.user$.subscribe(u => {
    //   this.userId = u.uid
    //   console.log('uid > ', u.uid);

    //   this.userService.get(this.userId).valueChanges().subscribe(x=>{
    //     console.log(x.isAdmin);
    //   })
    // })
    
  }

}
