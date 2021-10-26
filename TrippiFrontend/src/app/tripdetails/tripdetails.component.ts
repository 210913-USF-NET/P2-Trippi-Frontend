import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../service/api-service.service';

@Component({
  selector: 'app-tripdetails',
  templateUrl: './tripdetails.component.html',
  styleUrls: ['./tripdetails.component.css']
})
export class TripdetailsComponent implements OnInit {

  constructor(private currentroute: ActivatedRoute, private TAPI: ApiServiceService) { }

  ngOnInit(): void {
    console.log(this.currentroute);
  }

}
