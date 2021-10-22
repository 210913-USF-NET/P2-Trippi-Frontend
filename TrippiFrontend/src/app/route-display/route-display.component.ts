import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from '../service/api-service.service';

@Component({
  selector: 'app-route-display',
  templateUrl: './route-display.component.html',
  styleUrls: ['./route-display.component.css']
})
export class RouteDisplayComponent implements OnInit {

  constructor(private ApiService: ApiServiceService, private currentRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let tripStart = {address:"50 South Street, Franklin, MA, 02038", hours: 3, days: 2}
    this.ApiService.getRouteOptions(tripStart).then(result => {
      console.log(result);
    })
  }

}
