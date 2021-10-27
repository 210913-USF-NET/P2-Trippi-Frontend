import { Component, OnInit } from '@angular/core';
//import { tripPost } from '../model/tripPost';
import { ApiServiceService } from '../service/api-service.service';
import { Router } from '@angular/router';
import { trip } from '../model/trip';
import { AuthService } from '@auth0/auth0-angular';
import { user } from '../model/user';
import { TripdetailsComponent } from '../tripdetails/tripdetails.component';

@Component({
  selector: 'app-trip-history',
  templateUrl: './trip-history.component.html',
  styleUrls: ['./trip-history.component.css']
})
export class TripHistoryComponent implements OnInit {

  constructor(public TService: ApiServiceService, public troute: Router, public tauth: AuthService) { }

  //public Trips: tripPost[] = this.TService.getTrips()
    Trips: trip[] = [];
    // LoggedInUser: user ={
    //   id: 0,
    //   username: "",
    //   friends: []

    // }
    UserName: string = "";
  ngOnInit(): void {
    this.TService.getTrips().then(result => {
      console.log(result);
      this.Trips = result;
    })

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
