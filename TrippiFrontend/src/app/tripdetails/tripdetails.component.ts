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
    id: 0,
    userId: 0,
    tripId: 0,
    myRating: 0


    
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
      this.newrating.myRating = rateForm.value.rating;
      this.newrating.tripId = this.tripid;
      this.newrating.userId = this.userid;
      // this.apiSerive.setTrip(this.trip)
      // this.router.navigate(['route'])
      console.log("rating: " + this.newrating.myRating);
      console.log("trip: " + this.newrating.tripId);
      console.log("user: " + this.newrating.userId);

      this.TAPI.addReview(this.newrating);

      //this.rrouter.navigate(['trip-history']);
      location.reload();
      }
      else{
        console.log("invalid form");
      }
    }

}
