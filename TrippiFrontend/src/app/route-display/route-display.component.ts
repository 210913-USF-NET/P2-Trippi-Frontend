import { AfterContentInit, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tripPost } from '../model/tripPost';
import { tripStart } from '../model/tripStart';
import { ApiServiceService } from '../service/api-service.service';
declare const google: any;

@Component({
  selector: 'app-route-display',
  templateUrl: './route-display.component.html',
  styleUrls: ['./route-display.component.css']
})

export class RouteDisplayComponent implements OnInit, AfterViewInit{

  constructor(private ApiService: ApiServiceService, private currentRoute: ActivatedRoute, private route: Router) { 
  }
  
  
  marker1: any;
  markerN: any;
  markerS: any;
  markerE: any;
  markerW: any;
  map: any;
  @ViewChild('mapElement') mapElement: any;

  LatLong: number[][] = [];
  public newtrip : tripStart = {
  address: '',
  hours: 0,
  days: 0
  }
  public postTrip: tripPost = {
    userId: 18,
    startLat: 0,
    startLong: 0,
    endLat: 0,
    endLong: 0
    // rating: number;
}
  Addresses: string[] = [];

  ngAfterViewInit(): void {
    this.ApiService.getRouteOptions(this.newtrip).then(result => {
      this.LatLong = result;
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        center: { lat: this.LatLong[4][0], lng: this.LatLong[4][1]},
        zoom: 8,
      });
      this.marker1 = new google.maps.Marker({
        position: { lat: this.LatLong[4][0], lng: this.LatLong[4][1]},
        title: "Starting Address",
      });
      this.markerN = new google.maps.Marker({
        position: { lat: this.LatLong[0][0], lng: this.LatLong[0][1]},
        title: "North",
        label: "N"
      });
      this.markerS = new google.maps.Marker({
        position: { lat: this.LatLong[1][0], lng: this.LatLong[1][1]},
        title: "South",
        label: "S"
      });
      this.markerE = new google.maps.Marker({
        position: { lat: this.LatLong[2][0], lng: this.LatLong[2][1]},
        title: "East",
        label: "E"
      });
      this.markerW = new google.maps.Marker({
        position: { lat: this.LatLong[3][0], lng: this.LatLong[3][1]},
        title: "West",
        label: "W"
      });
      this.marker1.setMap(this.map);
      this.markerN.setMap(this.map);
      this.markerS.setMap(this.map);
      this.markerE.setMap(this.map);
      this.markerW.setMap(this.map);
    });
  }

  ngOnInit(): void {
    this.newtrip = this.ApiService.getTrip();
    console.log("ngOnInIt" + this.newtrip);
    this.ApiService.getPOIs(this.newtrip).then(result => {
      this.Addresses = result;
      console.log(this.Addresses);
    });
  }
  selectRoute(address: string, index: number): void{
    this.postTrip.startLat = this.LatLong[4][0];
    this.postTrip.startLong = this.LatLong[4][1];
    this.postTrip.endLat = this.LatLong[index][0];
    this.postTrip.endLong= this.LatLong[index][1];
    console.log(this.postTrip)
    this.ApiService.addTrip(this.postTrip)
    this.route.navigate(['mytrip'])
  }
}
