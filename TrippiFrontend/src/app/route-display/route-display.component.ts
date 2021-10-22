import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tripStart } from '../model/tripStart';
import { ApiServiceService } from '../service/api-service.service';
import {} from 'googlemaps';

@Component({
  selector: 'app-route-display',
  templateUrl: './route-display.component.html',
  styleUrls: ['./route-display.component.css']
})

export class RouteDisplayComponent implements OnInit {

  constructor(private ApiService: ApiServiceService, private currentRoute: ActivatedRoute) { }

  @ViewChild('map') mapElement: any;
  map!: google.maps.Map;

  LatLong: number[] = [];
  public newtrip : tripStart = {
  address: '',
  hours: 0,
  days: 0
}
  ngOnInit(): void {
    const mapProperties = {
      center: new google.maps.LatLng(35.2271, -80.8431),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);

    this.newtrip = this.ApiService.getTrip();
    console.log(this.newtrip)
    this.ApiService.getRouteOptions(this.newtrip).then(result => {
      this.LatLong = result;
      console.log(this.LatLong);
    })
  }

}
