import { Component, OnInit } from '@angular/core';
//import { tripPost } from '../model/tripPost';
import { ApiServiceService } from '../service/api-service.service';
import { Router } from '@angular/router';
import { trip } from '../model/trip';
import { AuthService } from '@auth0/auth0-angular';
import { user } from '../model/user';
import { TripdetailsComponent } from '../tripdetails/tripdetails.component';
import { ratings } from '../model/ratings';

@Component({
  selector: 'app-trip-history',
  templateUrl: './trip-history.component.html',
  styleUrls: ['./trip-history.component.css']
})
export class TripHistoryComponent implements OnInit {

  constructor(public TService: ApiServiceService, public troute: Router, public tauth: AuthService) { }

  //public Trips: tripPost[] = this.TService.getTrips()
    Trips: trip[] = [];
    AllRatings: ratings[] = [];
    // LoggedInUser: user ={
    //   id: 0,
    //   username: "",
    //   friends: []

    // }
    rid: number = 3;
    UserName: string = "";
  ngOnInit(): void {
    this.TService.getTrips().then(result => {
      console.log(result);
      this.Trips = result;
      console.log("trips " + this.Trips[0].username);
    })

    this.TService.getReview().then(rats => {
      // console.log(rats);
      this.AllRatings = rats;
      console.log(this.AllRatings);
      this.rid = this.AllRatings[0].id;
      if(this.AllRatings)
      {
        console.log("revs " + this.AllRatings.length);
      }
      for(let i = 0; i < this.AllRatings.length; i++)
      {
      console.log("rating is " + this.AllRatings[i].tripId + " hmm");
      }
    })
    
    
    //console.log("test" + this.AllRatings[0].Id);
    this.tauth.user$.subscribe((user) => {
      if(user?.nickname !== null && user?.nickname !== undefined)
      {
        this.UserName = user.nickname;
      }
      console.log("username is " + this.UserName);
    })

    
  }

  goToTrip(tripid: number)
  {
    console.log("go to tripo " + tripid);
    this.troute.navigate(['trip-history/' + tripid]);
  }

}
