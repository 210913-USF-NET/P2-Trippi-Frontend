import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tripPost } from '../model/tripPost';
import { ApiServiceService } from '../service/api-service.service';

@Component({
  selector: 'app-chosen-trip',
  templateUrl: './chosen-trip.component.html',
  styleUrls: ['./chosen-trip.component.css']
})
export class ChosenTripComponent implements OnInit {

  constructor(private ApiService: ApiServiceService, private currentRoute: ActivatedRoute, private route: Router) { }
  private myroute: tripPost = {
    userId: 0,
    startLat: 0,
    startLong: 0,
    endLat: 0,
    endLong: 0
  };

  ngOnInit(): void {
    this.myroute = this.ApiService.getRoute();
    console.log(this.myroute);
  }

}
