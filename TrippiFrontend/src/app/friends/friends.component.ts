import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../service/api-service.service';
import { Router } from '@angular/router';
import { user } from '../model/user';
import { AuthService } from '@auth0/auth0-angular';
import { friend } from '../model/friend';
import { trip } from '../model/trip';
import { tripInvite } from '../model/tripInvite';

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

trips: trip[] = []

//name: string = '';

friends: user[] = []

modalFriend: user = {
  id: 0,
  username: '',
  friends: []
}

friend: friend = {
  id: 0,
  userId: 0,
  friendId: 0
}

tripInvite: tripInvite = {
  id: 0,
  toUserId: 0,
  fromUserId: 0,
  tripId: 0,
  status: 0
}

invites: tripInvite[] = []

tripsToInvite: trip[] = []

invitesCounter: number = 0;
anotherCounter: number = 0;

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

        this.fService.getTrips().then(trips => {
          if(trips){
            for(let trip of trips){
              if(trip.username === this.user1.username){
                this.trips.push(trip);
              }
            }
          }
        })

        console.log(this.user1);
        console.log(this.users);

        for(let friend of this.user1.friends){
          this.fService.getOneUser(friend.friendId).then(result => {
            if(result){
              // this.name = result.username;
              // this.usernames.push(this.name);
              this.friends.push(result)
            }
          })
        }


        for(let notFriend of this.users){
          console.log(notFriend)
          console.log(this.counter)
          console.log(this.counter1)
          
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
                  this.counter = 0;
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
          this.fService.addFriend(this.friend).then((res) =>{
            alert(`${userFriend.username} is now your friend.`);
            this.fService.getUsers().then((allUsers) => {
              this.users = allUsers;
              for (let user2 of this.users){
                if(user2.username === user?.nickname){
                  this.user1 = user2 
                }
              }
              
              this.notFriends = [];
              this.usernames = [];
              this.friends = [];

              console.log(this.user1);
      
              for(let friend of this.user1.friends){
                this.fService.getOneUser(friend.friendId).then(result => {
                  if(result){
                    // this.name = result.username;
                    // this.usernames.push(this.name);
                    this.friends.push(result)
                  }
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
                        this.counter = 0;
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
          
        })
  
      })
    }
    
  }

  goToFriend(name: string):void{
    this.route.navigateByUrl(`friend/${name}`);
  }

  onModal(event: Event, user: user){
    event.stopPropagation();
    this.modalFriend = user;

    this.invites = []

    this.fService.getTripInvites().then(res => {
      if(res){
        for(let invite of res){
          if(invite.fromUserId == this.user1.id){
            this.invites.push(invite)
          }
        } 
      }
      
      this.tripsToInvite = []
      this.invitesCounter = 0
      this.anotherCounter = 0
      console.log(this.invites)

      for(let invite of this.invites){
        if(invite.toUserId === this.modalFriend.id){
          this.invitesCounter = 0
          for(let trip of this.trips){
            if(trip.id === invite.tripId){
              continue
            }
            else{
              console.log(trip)
              if(!this.tripsToInvite.includes(trip)){
                this.tripsToInvite.push(trip)
              }
            }
          }
        }
        else{
        this.anotherCounter++
        }
      }

      if(this.anotherCounter === this.invites.length){
        for(let trip of this.trips){
          this.tripsToInvite.push(trip)
        }
      }

      // for(let trip of this.trips){
      //   for(let invite of this.invites){
      //     if(invite.toUserId !== this.modalFriend.id && invite.tripId !== trip.id){
      //       this.tripsToInvite.push(trip)
      //     }
      //   }
      // }
    })
  } 

  onInvite(event: Event, modalFriend: user, trip: trip){
    this.tripInvite.fromUserId = this.user1.id
    this.tripInvite.toUserId = modalFriend.id
    this.tripInvite.tripId = trip.id
    this.tripInvite.status = 0

    this.fService.addTripInvite(this.tripInvite).then(res =>{
      alert(`Trip Invitation successfully sent to ${modalFriend.username}`)
      location.reload()
    })
  }
}

