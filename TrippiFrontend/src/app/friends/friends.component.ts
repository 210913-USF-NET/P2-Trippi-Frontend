import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../service/api-service.service';
import { Router } from '@angular/router';
import { user } from '../model/user';
import { AuthService } from '@auth0/auth0-angular';
import { friend } from '../model/friend';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  constructor(private fService: ApiServiceService, private route: Router, public auth: AuthService) { }

users: user[] = []
user1: user = {
  id: 0,
  username: '',
  friends: []
}

notFriends: user[] = []

usernames: string[] = []

name: string = '';

friend: friend = {
  id: 0,
  userId: 0,
  friendId: 0
}

counter: number = 0
counter1: number = 0

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

        console.log(this.user1);

        for(let friend of this.user1.friends){
          this.fService.getOneUser(friend.friendId).then(result => {
            this.name = result.username;
            this.usernames.push(this.name);
          })
        }

        for(let notFriend of this.users){
          if(this.user1.friends.length !==0){
            if(notFriend.username !== this.user1.username){
              for(let userFriend of notFriend.friends){
                for(let fr of this.user1.friends){
                  if(userFriend.userId !== fr.friendId && userFriend.friendId !== fr.userId){
                    this.counter++;
                    continue;
                  }
                  else{
                    break;
                  }
                }
                if(this.counter === this.user1.friends.length)
                {
                  this.counter = 0;
                  this.counter1++;
                  continue;
                }
                else{
                  break;
                }
              }
    
              if(this.counter1 === notFriend.friends.length){
                this.notFriends.push(notFriend);
                this.counter1 = 0;
              }
            }
          }
          else{
            if(notFriend.username !== this.user1.username){
              this.notFriends.push(notFriend);
            }
          }
          
        }

        console.log(this.notFriends)
      })
    })
  }

  onSubmit(event: Event, userFriend: user){
    event.stopPropagation();
    let response = confirm(`Do you really want to add ${userFriend.username} as a friend`).valueOf()
    
    if(response){
      this.auth.user$.subscribe((user) => {
        this.fService.getUsers().then(result => {
          this.users = result;
          for (let user2 of this.users){
            if(user2.username === user?.nickname){
              this.user1 = user2 
            }
          }
  
          this.friend.userId = this.user1.id;
          this.friend.friendId = userFriend.id
          this.fService.addFriend(this.friend)
  
          this.friend.userId = userFriend.id
          this.friend.friendId = this.user1.id
          this.fService.addFriend(this.friend)
          
          alert(`${userFriend.username} is now your friend.`)
        })
  
      })
    }
    
  }

  goToFriend(name: string):void{
    this.route.navigateByUrl(`friend/${name}`);
  }
  
}

