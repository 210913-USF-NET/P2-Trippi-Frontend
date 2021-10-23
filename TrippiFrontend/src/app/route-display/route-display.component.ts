import { AfterContentInit, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tripStart } from '../model/tripStart';
import { ApiServiceService } from '../service/api-service.service';
declare const google: any;

@Component({
  selector: 'app-route-display',
  templateUrl: './route-display.component.html',
  styleUrls: ['./route-display.component.css']
})

export class RouteDisplayComponent implements OnInit, AfterViewInit{

  constructor(private ApiService: ApiServiceService, private currentRoute: ActivatedRoute) { 
    this.newtrip = this.ApiService.getTrip();
  }

  map: any;
  @ViewChild('mapElement') mapElement: any;

  LatLong: number[][] = [];
  public newtrip : tripStart = {
    formattedaddress: '',
  hours: 0,
  days: 0
  }

  Addresses: string[] = [];

  ngAfterViewInit(): void {
    this.ApiService.getRouteOptions(this.newtrip).then(result => {
      this.LatLong = result;
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        center: { lat: this.LatLong[4][0], lng: this.LatLong[4][1]},
        zoom: 8 
      });
    });
    }
  
  ngOnInit(): void {
    console.log(this.newtrip)
    this.ApiService.getPOIs(this.newtrip).then(result => {
      this.Addresses = result;
      console.log(this.Addresses);
    });
  }
}
