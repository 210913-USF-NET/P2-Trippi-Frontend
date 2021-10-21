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

  constructor(private apiService: ApiServiceService, private currentRoute: ActivatedRoute, private router: Router) { }
  trip : tripStart = {
    address: '',
    hours: 0,
    days: 0
  }
  ngOnInit(): void {
  }
onSubmit(tripForm: NgForm){
  if(tripForm.valid){
    this.apiService.getRouteOptions(this.trip).then((res) => {
      this.router.navigate(['routes' + tripForm])
    })
  }
    
}
}
