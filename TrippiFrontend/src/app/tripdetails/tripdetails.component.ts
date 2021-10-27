import { Component, OnInit, Input } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from '../service/api-service.service';
import { AuthService } from '@auth0/auth0-angular';
import { user } from '../model/user';
import { ratings } from '../model/ratings';

@Component({
  selector: 'app-tripdetails',
  templateUrl: './tripdetails.component.html',
  styleUrls: ['./tripdetails.component.css']
})
export class TripdetailsComponent implements OnInit {

 
  constructor( private currentroute: ActivatedRoute, private TAPI: ApiServiceService, public tauth: AuthService, private rrouter: Router) { 
    // this.tripid = tabletripid;
  }
  
  @Input() tabletripid?: number;
  tripid: number = 0;
  userid: number = 0;
  UserName: string = "";
  AllUsers: user[] = [];
  newrating: ratings = {
    Id: 0,
    UserId: 0,
    TripId: 0,
    MyRating: 0


    
  }

  ngOnInit(): void {
    console.log(this.currentroute.params);

    // this.currentroute.params.subscribe((para) => {
    //   console.log(para.id);
    //   // this.tripid = para.id;
    // })
    if(this.tabletripid)
    {
      this.tripid = this.tabletripid;
    }
    this.tauth.user$.subscribe((user) => {
      if(user?.nickname !== null && user?.nickname !== undefined)
      {
        this.UserName = user.nickname;
      }
      console.log("username is " + this.UserName);
    })

    this.TAPI.getUsers().then(usos => {
      this.AllUsers = usos;
      for(let i = 0; i < usos.length; i++)
      {
          if(usos[i].username == this.UserName)
          {
            this.userid = usos[i].id;
            break;
          }
      }
    })
  }

  onSubmit(rateForm: NgForm){
    if(rateForm.valid){
      //console.log(rateForm);
      //console.log(rateForm.value.rating);
      this.newrating.MyRating = rateForm.value.rating;
      this.newrating.TripId = this.tripid;
      this.newrating.UserId = this.userid;
      // this.apiSerive.setTrip(this.trip)
      // this.router.navigate(['route'])
      console.log("rating: " + this.newrating.MyRating);
      console.log("trip: " + this.newrating.TripId);
      console.log("user: " + this.newrating.UserId);

      this.TAPI.addReview(this.newrating);

      this.rrouter.navigate(['trip-history']);
      }
      else{
        console.log("invalid form");
      }
    }

}
