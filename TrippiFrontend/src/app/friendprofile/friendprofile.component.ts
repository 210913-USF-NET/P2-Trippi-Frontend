import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { trip } from '../model/trip';
import { user } from '../model/user';
import { ApiServiceService } from '../service/api-service.service';


@Component({
  selector: 'app-friendprofile',
  templateUrl: './friendprofile.component.html',
  styleUrls: ['./friendprofile.component.css']
})
export class FriendprofileComponent implements OnInit {

  constructor(private currnetRoute: ActivatedRoute, private fService:ApiServiceService) { }

  name: string = '';
  user1: user = {
    id: 0,
    username: '',
    friends: []
  }
  trips: trip[] = []

userName: string = '';
userNames: string[] = [];

  ngOnInit(): void {
    this.currnetRoute.params.subscribe(params => {
      this.name = params["name"];
      this.fService.getUsers().then(users =>{
        for(let user of users){
          if(user.username === this.name){
            this.user1 = user;
          }
        }

        for(let friend of this.user1.friends){
          this.fService.getOneUser(friend.friendId).then(result => {
            this.userName = result.username;
            this.userNames.push(this.userName);
          })
        }
      })

      this.fService.getTrips().then(trips =>{
        if(trips){
          for(let trip of trips){
            if(trip.username == this.name){
              this.trips.push(trip);
            }
          }
        }
      })

      console.log(this.user1);
      
    })
  }

}
