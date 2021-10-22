import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../service/api-service.service';
import { Router } from '@angular/router';
import { user } from '../model/user';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  constructor(private fService: ApiServiceService, private route: Router, public auth: AuthService) { }

users: user[] = []
user1: user = {
  username: '',
  friends: []
}

name: string = '';

ngOnInit(): void {
    this.auth.user$.subscribe((user) =>{
      console.log("This is ", user);

      this.fService.getUsers().then(result => {
        this.users = result;
        for (let user2 of this.users){
          if(user2.username === user?.nickname){
            this.user1 = user2 
          }
        }
      })
    })
  }

  userName(id: number): string{
    this.fService.getOneUser(id).then(result => {
      this.name = result.username;
      return this.name;
    })

    return this.name;
  }
  
}

