import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tripPost } from '../model/tripPost';
import { ApiServiceService } from '../service/api-service.service';
import { FriendsComponent } from '../friends/friends.component';
declare const google: any;

@Component({
  selector: 'app-chosen-trip',
  templateUrl: './chosen-trip.component.html',
  styleUrls: ['./chosen-trip.component.css']
})
export class ChosenTripComponent implements OnInit, AfterViewInit{

  constructor(private ApiService: ApiServiceService, private currentRoute: ActivatedRoute, private route: Router) { }
  
  public myroute: tripPost = {
    username: "",
    startLat: 0,
    startLong: 0,
    endLat: 0,
    endLong: 0,
    startAddress: "",
    endAddress: ""
    // rating: number;
}

map: any;
  @ViewChild('mapElement') mapElement: any;

  ngOnInit(): void {
    this.myroute = this.ApiService.getRoute();
    console.log(this.myroute);
    
  }

  ngAfterViewInit(): void {
    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      center: { lat: this.myroute.startLat, lng: this.myroute.startLong},
      zoom: 8,
    });
    directionsRenderer.setMap(this.map);
    var request = {
      origin: this.myroute.startAddress,
      destination: this.myroute.endAddress,
      travelMode: 'DRIVING'
    };
    directionsService.route(request, function(result: any, status: string) {
      if (status == 'OK') {
        directionsRenderer.setDirections(result);
      }
    });
  }
    
}
