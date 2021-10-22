import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tripStart } from '../model/tripStart';
import { ApiServiceService } from '../service/api-service.service';

@Component({
  selector: 'app-route-display',
  templateUrl: './route-display.component.html',
  styleUrls: ['./route-display.component.css']
})
export class RouteDisplayComponent implements OnInit {

  constructor(private ApiService: ApiServiceService, private currentRoute: ActivatedRoute) { }
  LatLong: number[] = [];
  public newtrip : tripStart = {
  address: '',
  hours: 0,
  days: 0
}
  ngOnInit(): void {
    this.newtrip = this.ApiService.getTrip();
    console.log(this.newtrip)
    this.ApiService.getRouteOptions(this.newtrip).then(result => {
      this.LatLong = result;
      console.log(this.LatLong);
    })
  }

}
