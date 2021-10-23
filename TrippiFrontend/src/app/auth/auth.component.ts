import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ApiServiceService } from '../service/api-service.service';
import { user } from '../model/user';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(public auth: AuthService, private trippiService: ApiServiceService, @Inject(DOCUMENT) public document: Document) { }

  rootUrl: string = 'http://localhost:4200/';

  isLoggedIn: boolean = false;

  user: user = {
    id: 0,
    username: '',
    friends: []
  }

  authuser: string | undefined = '';

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe((isAuthenticated) =>{
        this.isLoggedIn = isAuthenticated;
        console.log("This is ", this.isLoggedIn);

        this.auth.user$.subscribe((user) =>{
            this.authuser = user?.nickname;

            if(this.authuser !== undefined){
              this.user.username = this.authuser;
              console.log("This is ", this.authuser);
              this.trippiService.addUser(this.user);
            }
        });
    })

}
}
