import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { trip } from '../model/trip';
import { tripInvite } from '../model/tripInvite';
import { tripInviteSent } from '../model/tripInviteSent';
import { user } from '../model/user';
import { tripPost} from '../model/tripPost';
import { ApiServiceService } from '../service/api-service.service';

@Component({
  selector: 'app-trip-invite',
  templateUrl: './trip-invite.component.html',
  styleUrls: ['./trip-invite.component.css']
})
export class TripInviteComponent implements OnInit {

  constructor(private fService: ApiServiceService, private route: Router, public auth: AuthService) { }

  user: user = {
    id: 0,
    username: '',
    friends: []
  }
  tripInviteSent: tripInviteSent = {
    id: 0,
    userID: 0,
    tripID:0,
    username: '',
    startAddress: '',
    endAddress: '',
    status: 0
  }

  tripInviteReceived: tripInviteSent = {
    id: 0,
    userID: 0,
    tripID:0,
    username: '',
    startAddress: '',
    endAddress: '',
    status: 0
  }

  trip1: trip = {
    id: 0,
    username: '',
    startAddress: '',
    endAddress: '',
    rating: 0
  }

  invite: tripInvite = {
    id: 0,
    toUserId: 0,
    fromUserId: 0,
    tripId: 0,
    status: 0
  }

  tripPost: tripPost = {
    id: 0,
    username: '',
    startAddress: '',
    endAddress: '',
    startLat: 0,
    startLong: 0,
    endLat: 0,
    endLong: 0,
    rating: [] 
  }


  users: user[] = []
  sentInvites: tripInvite[] = []
  receivedInvites: tripInvite[] = []
  receivedTrips: tripInviteSent[] = []
  sentTrips: tripInviteSent[] = []
  

  ngOnInit(): void {
    this.auth.user$.subscribe((user) =>{
      this.fService.getUsers().then(result => {
        this.users = result;
        for (let user2 of this.users){
          if(user2.username === user?.nickname){
            this.user = user2 
          }
        }

        this.fService.getTripInvites().then(tripInvites =>{
          console.log(tripInvites)
          for(let invite of tripInvites){
            if(invite.fromUserId === this.user.id){
              this.sentInvites.push(invite)
            }
            else if(invite.toUserId === this.user.id){
              this.receivedInvites.push(invite)
            }
          }

          for(let invite of this.sentInvites){
            this.fService.getOneTrip(invite.tripId).then(trip =>{
              this.fService.getOneUser(invite.toUserId).then(res =>{
                this.tripInviteSent = {
                  id: 0,
                  userID: 0,
                  tripID:0,
                  username: '',
                  startAddress: '',
                  endAddress: '',
                  status: 0
                }

                this.tripInviteSent.id = invite.id
                this.tripInviteSent.status = invite.status

                this.tripInviteSent.startAddress = trip.startAddress
                this.tripInviteSent.endAddress = trip.endAddress

                this.tripInviteSent.username = res.username
                this.sentTrips.push(this.tripInviteSent)
              })
            })
          }

          for(let invite of this.receivedInvites){
            this.fService.getOneTrip(invite.tripId).then(trip =>{
              this.fService.getOneUser(invite.fromUserId).then(res =>{
                this.tripInviteReceived = {
                  id: 0,
                  userID: 0,
                  tripID:0,
                  username: '',
                  startAddress: '',
                  endAddress: '',
                  status: 0
                }

                this.tripInviteReceived.id = invite.id
                this.tripInviteReceived.userID = invite.fromUserId
                this.tripInviteReceived.tripID = invite.tripId
                this.tripInviteReceived.status = invite.status

                this.tripInviteReceived.startAddress = trip.startAddress
                this.tripInviteReceived.endAddress = trip.endAddress

                this.tripInviteReceived.username = res.username
                this.receivedTrips.push(this.tripInviteReceived)
              })
            })
          }
        })
        console.log(this.sentInvites)
        console.log(this.receivedInvites)
  
        // this.fService.getTrips().then(trips => {
        //   if(trips){
        //     for(let trip of trips){
        //       for(let invite of this.receivedInvites){
        //         if(trip.id === invite.tripId){
        //           this.receivedTrips.push(trip)
        //           break
        //         }
        //         else{
        //           continue
        //         }
        //       }
        //     }
        //   }
        // })
        console.log(this.receivedTrips)
        console.log(this.sentTrips)
      })
    })
}

onAccept(event: Event, trip: tripInviteSent){
  event.stopPropagation;
  this.auth.user$.subscribe((user) =>{
    this.fService.getUsers().then(result => {
      this.users = result;
      for (let user2 of this.users){
        if(user2.username === user?.nickname){
          this.user = user2 
        }
      }

      this.invite.id = trip.id
      this.invite.fromUserId = trip.userID
      this.invite.toUserId = this.user.id
      this.invite.tripId = trip.tripID
      this.invite.status = 1

      this.fService.updateTripInvite(this.invite).then(res =>{
        console.log('Reached here')
      })

      this.fService.getOneTrip(trip.id).then(newTrip => {
        this.tripPost.username = this.user.username
        this.tripPost.startAddress = newTrip.startAddress
        this.tripPost.endAddress = newTrip.endAddress

        console.log(this.tripPost)
        
        this.fService.addInvitedTrip(this.tripPost).then(addedTrip =>{
          alert(`Trip Invitation successfully accepted`)
          location.reload()
        })
      })
    })
  })
}

onDecline(event: Event, trip: tripInviteSent){
  event.stopPropagation;
  this.auth.user$.subscribe((user) =>{
    this.fService.getUsers().then(result => {
      this.users = result;
      for (let user2 of this.users){
        if(user2.username === user?.nickname){
          this.user = user2 
        }
      }

      this.invite.id = trip.id
      this.invite.fromUserId = trip.userID
      this.invite.toUserId = this.user.id
      this.invite.tripId = trip.tripID
      this.invite.status = 2

      this.fService.updateTripInvite(this.invite).then(res =>{
        alert(`Trip Invitation successfully declined`)
        location.reload()
      }) 
    })
  })
}

}
