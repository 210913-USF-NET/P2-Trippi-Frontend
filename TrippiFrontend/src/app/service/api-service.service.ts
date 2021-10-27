import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { tripStart } from '../model/tripStart';
import { user } from '../model/user';
import { friend } from '../model/friend';

import { tripOptions } from '../model/tripOptions';
import { tripPost } from '../model/tripPost';
import { trip } from '../model/trip';
import { ratings } from '../model/ratings';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  //Please declare routes like below depending on what you need to pull from the api
  root: string = 'https://p2trippiapi.azurewebsites.net/api/';
  rootUrl: string =  'https://p2trippiapi.azurewebsites.net/api/User';
  rootUrl1: string =  'https://p2trippiapi.azurewebsites.net/api/Friend';

  users : user[] = [];
  counter: number = 0;
  private tripStart: tripStart ={
    address: '',
    hours: 0,
    days: 0,
}
public myroute: tripPost = {
  username: "",
  startLat: 0,
  startLong: 0,
  endLat: 0,
  endLong: 0,
  startAddress: "",
  endAddress: "",
  id: 0,
  rating: null
  // rating: number;
}
  constructor(private http: HttpClient) { }

  getRouteOptions(tripStart: tripStart) : Promise<[]>
  {
    return this.http.get<[]>(this.root + `route/${tripStart.address} ${tripStart.hours} ${tripStart.days}`).toPromise();
  }


  getPOIs(tripStart: tripStart) : Promise<[]>
  {
    return this.http.get<[]>(this.root + `POI/${tripStart.address} ${tripStart.hours} ${tripStart.days}`).toPromise();
  }

  // getTrips(): Promise<tripPost[]>
  // {
  //   return this.http.get<[]>(this.root + `Trip/`).toPromise();
  // }


  addUser(user:user)
  {

    this.http.get<user[]>(this.rootUrl).toPromise().then(result => {
      this.users = result;
      if(this.users)
      {
        for(let user2 of this.users){
          if (user2.username === user.username){
            break;
          }
          else{
            this.counter++;
            continue;
          }
        }
  
        if(this.counter === this.users.length){
          console.log(this.users.length);
          this.http.post<user>(this.rootUrl, user).toPromise();
        }
      }
      else{
        this.http.post<user>(this.rootUrl, user).toPromise();
      }
      })
}


  getUsers(): Promise<user[]>
  {
    return this.http.get<user[]>(this.rootUrl).toPromise();
  }

  getOneUser(id: number): Promise<user>
  {
    return this.http.get<user>(this.rootUrl + "/" + id).toPromise();
  }

  addFriend(friend: friend): Promise<friend>{
    return this.http.post<friend>(this.rootUrl1, friend).toPromise();
  }

  setTrip( tripForm: tripStart) {      
    this.tripStart = tripForm;  
  }  
  
  getTrip() {  
    return this.tripStart ;  
  }  
  addTrip(postTrip: tripPost): Promise<tripPost>
  {
    this.myroute = postTrip;
    console.log(postTrip)
    // return this.http.post<tripPost>(this.root + `Trip/${postTrip}`).toPromise();
    return this.http.post<tripPost>(this.root + "Trip/",  postTrip).toPromise();
  }
  getRoute(){
    return this.myroute;
  }

  getTrips(): Promise<trip[]>{
    return this.http.get<trip[]>(this.root + "/Trip").toPromise();
  }

  addReview(reviewToAdd: ratings): Promise<ratings>
  {
    return this.http.post<ratings>(this.root + "/Rating", reviewToAdd).toPromise();
  }
}
