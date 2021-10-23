import { Component, OnInit } from '@angular/core';

import { ApiServiceService } from '../service/api-service.service';
import { NgForm, NgModel } from '@angular/forms';
import { tripStart } from '../model/tripStart';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.css']
})
export class TripFormComponent implements OnInit {

  constructor(private currentRoute: ActivatedRoute, private router: Router, private apiSerive: ApiServiceService) { }
  title = 'rou';
  //Local Variable defined
  
  options={
    componentRestrictions:{
      country:["US"]
    }}
  trip : tripStart = {
    formattedaddress: '',
    hours: 0,
    days: 0
  }
  ngOnInit(): void {
  }
onSubmit(tripForm: NgForm){
  if(tripForm.valid){
    this.apiSerive.setTrip(this.trip)
    this.router.navigate(['route'])
    }
  }
  public AddressChange(address: any) {
    //setting address from API to local variable
     this.trip.formattedaddress=address.formatted_address
  }

}
