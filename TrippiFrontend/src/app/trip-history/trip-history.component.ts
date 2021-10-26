import { Component, OnInit } from '@angular/core';
import { tripPost } from '../model/tripPost';
import { ApiServiceService } from '../service/api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-history',
  templateUrl: './trip-history.component.html',
  styleUrls: ['./trip-history.component.css']
})
export class TripHistoryComponent implements OnInit {

  constructor(public TService: ApiServiceService, public troute: Router) { }

  //public Trips: tripPost[] = this.TService.getTrips()
    Trips: tripPost[] = [];
  ngOnInit(): void {
    this.TService.getTrips().then(result => {
      console.log(result);
      this.Trips = result;
    })
  }

  goToTrip(tripid: number)
  {
    console.log("go to tripo " + tripid);
    this.troute.navigate(['trip-history/' + tripid]);
  }

}
