import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ApiServiceService } from '../service/api-service.service';
import { user } from '../model/user';
import { tripInvite } from '../model/tripInvite';


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

  users: user[] = []
  sentInvites: tripInvite[] = []
  receivedInvites: tripInvite[] = []

  counter: number = 0

  authuser: string | undefined = '';

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe((isAuthenticated) =>{
        this.isLoggedIn = isAuthenticated;
        console.log("This is ", this.isLoggedIn);
        console.log(this.user)
        this.auth.user$.subscribe((user) =>{
            this.authuser = user?.nickname;

            if(this.authuser !== undefined){
              this.user.username = this.authuser;
              console.log("This is ", this.authuser);
              this.trippiService.addUser(this.user);
            }

            this.trippiService.getUsers().then(result => {
              this.users = result;
              for (let user2 of this.users){
                if(user2.username === user?.nickname){
                  this.user = user2 
                }
              }
      
              this.trippiService.getTripInvites().then(tripInvites =>{
                console.log(tripInvites)
                for(let invite of tripInvites){
                  if(invite.fromUserId === this.user.id){
                    this.sentInvites.push(invite)
                  }
                  else if(invite.toUserId === this.user.id && invite.status === 0){
                    this.receivedInvites.push(invite)
                    this.counter++
                  }
                }
              })
            })
            console.log(this.receivedInvites)
        })
    })

  }

}
